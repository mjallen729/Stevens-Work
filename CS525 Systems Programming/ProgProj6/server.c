/* Server code with support for concurrent connections */
#include <errno.h>
#include <netinet/in.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>
#include <sys/time.h>
#include <sys/types.h>
#include <unistd.h>

#define BUF_SIZE 1024
#define LISTEN_PORT 8080
#define MAX_CLIENTS 10

int main(int argc, char *argv[]) {
  int sock_listen, max_sd, activity, new_socket, sd;
  int client_socket[MAX_CLIENTS] = {0};
  struct sockaddr_in my_addr, recv_addr;
  socklen_t addr_len;
  fd_set readfds;
  char buf[BUF_SIZE];

  // Create listening socket
  sock_listen = socket(PF_INET, SOCK_STREAM, IPPROTO_TCP);
  if (sock_listen < 0) {
    perror("socket() failed");
    exit(1);
  }

  // Allow socket reuse to prevent "Address already in use" errors
  int opt = 1;
  if (setsockopt(sock_listen, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt)) <
      0) {
    perror("setsockopt() failed");
    exit(1);
  }

  // Prepare server address structure
  memset(&my_addr, 0, sizeof(my_addr));
  my_addr.sin_family = AF_INET;
  my_addr.sin_addr.s_addr = htonl(INADDR_ANY);
  my_addr.sin_port = htons((unsigned short)LISTEN_PORT);

  // Bind socket
  if (bind(sock_listen, (struct sockaddr *)&my_addr, sizeof(my_addr)) < 0) {
    perror("bind() failed");
    exit(1);
  }

  // Listen for connections
  if (listen(sock_listen, MAX_CLIENTS) < 0) {
    perror("listen() failed");
    exit(1);
  }

  printf("Server listening on port %d\n", LISTEN_PORT);

  while (1) {
    // Clear the socket set
    FD_ZERO(&readfds);

    // Add listening socket to the set
    FD_SET(sock_listen, &readfds);
    max_sd = sock_listen;

    // Add child sockets to set
    for (int i = 0; i < MAX_CLIENTS; i++) {
      sd = client_socket[i];

      // If valid socket descriptor, add to read list
      if (sd > 0) FD_SET(sd, &readfds);

      // Update max socket descriptor
      if (sd > max_sd) max_sd = sd;
    }

    // Wait for activity on sockets
    activity = select(max_sd + 1, &readfds, NULL, NULL, NULL);

    if ((activity < 0) && (errno != EINTR)) {
      perror("select() error");
    }

    // Incoming connection
    if (FD_ISSET(sock_listen, &readfds)) {
      addr_len = sizeof(recv_addr);
      new_socket =
          accept(sock_listen, (struct sockaddr *)&recv_addr, &addr_len);

      if (new_socket < 0) {
        perror("accept() failed");
        continue;
      }

      // Add new socket to array of sockets
      for (int i = 0; i < MAX_CLIENTS; i++) {
        if (client_socket[i] == 0) {
          client_socket[i] = new_socket;
          printf("New client connected on socket %d (%d/%d)\n", new_socket, i, MAX_CLIENTS);
          break;
        }
      }
    }

    // IO operation on some other socket
    for (int i = 0; i < MAX_CLIENTS; i++) {
      sd = client_socket[i];

      if (FD_ISSET(sd, &readfds)) {
        // Check if it was for closing, and read the incoming message
        int bytes_received = recv(sd, buf, BUF_SIZE, 0);

        if (bytes_received <= 0) {
          // Client disconnected
          getpeername(sd, (struct sockaddr *)&recv_addr, &addr_len);
          printf("Client disconnected\n");

          // Close the socket and mark as available
          close(sd);
          client_socket[i] = 0;
        } else {
          // Terminate the buffer
          buf[bytes_received] = '\0';
          printf("Received on socket %d: %s\n", sd, buf);

          // Exit condition
          if (strcmp(buf, "shutdown") == 0) {
            // Close all client connections
            for (int j = 0; j < MAX_CLIENTS; j++) {
              if (client_socket[j] != 0) {
                close(client_socket[j]);
                client_socket[j] = 0;
              }
            }
            close(sock_listen);
            exit(0);
          }
        }
      }
    }
  }

  return 0;
}