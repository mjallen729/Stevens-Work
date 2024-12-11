/* Client code */
#include <arpa/inet.h>
#include <netinet/in.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>
#include <sys/time.h>
#include <unistd.h>

#define BUF_SIZE 1024
#define SERVER_IP "127.0.0.1"
#define SERVER_PORT 8080

int main(int argc, char *argv[]) {
  int sock_send;
  int i;
  int send_len, bytes_sent;

  char text[80], buf[BUF_SIZE];

  struct sockaddr_in addr_send;

  /* create socket for sending data */
  sock_send = socket(PF_INET, SOCK_STREAM, IPPROTO_TCP);
  if (sock_send < 0) {
    printf("socket() failed\n");
    exit(0);
  }

  /* create socket address structure to connect to */
  memset(&addr_send, 0, sizeof(addr_send));
  addr_send.sin_family = AF_INET;
  addr_send.sin_addr.s_addr = inet_addr(SERVER_IP);
  addr_send.sin_port = htons((unsigned short)SERVER_PORT);

  /* connect to server */
  i = connect(sock_send, (struct sockaddr *)&addr_send, sizeof(addr_send));
  if (i < 0) {
    perror("connect() failed\n");
    exit(0);
  }
  printf("Connected to the server.\n");

  while (1) {
    /* send some data */
    printf("Send? ");
    scanf("%s", text);
    if (strcmp(text, "quit") == 0) break;

    strcpy(buf, text);
    send_len = strlen(text);
    bytes_sent = send(sock_send, buf, send_len, 0);
  }

  close(sock_send);
}
