// This program will continuously scan the log file until it is killed.
// Try adding new ERROR keywords to the end of the logfile while program
//  is running, they will be flagged in the output!

#include <fcntl.h>
#include <signal.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/wait.h>
#include <unistd.h>

#define LOG_FILE "logfile.log"

// Function prototypes
void handle_exception(int sig);
void monitor_logfile();

int main() {
  pid_t pid;

  printf("Parent process (PID: %d) monitoring log file.\n", getpid());

  // Signal handler
  signal(SIGUSR1, handle_exception);

  // Fork a child process to monitor log file
  pid = fork();
  if (pid < 0) {
    perror("Fork failed");
    exit(1);

  }

  if (pid == 0) {
    // Child process
    monitor_logfile();

  } else {
    // Parent process
    int task_count = 0;
    while (1) {
      printf("Task %d started (PID: %d)\n", ++task_count, getpid());
      sleep(3);  // Simulate work done by parent process

    }

  }

  return 0;

}

// Signal handler function for parent process
void handle_exception(int sig) {
  if (sig == SIGUSR1) {
    printf("Exception detected in log file!\n");

  }

}

// Function to monitor the log file for ERROR entries
void monitor_logfile() {
  FILE *logfile = fopen(LOG_FILE, "r");
  char buffer[256];

  if (!logfile) {
    perror("Error opening log file");
    exit(1);

  }

  long current_position = ftell(logfile); // Save cur position
  while (1) {
    fseek(logfile, current_position, SEEK_SET);

    // Read through the log file to detect errors
    while (fgets(buffer, sizeof(buffer), logfile) != NULL) {
      if (strstr(buffer, "ERROR") != NULL) {
        kill(getppid(), SIGUSR1);
        sleep(1);  // Brief pause to simulate work done for error

      }

      current_position = ftell(logfile);

    }

    sleep(1);
    // printf(".\n"); // Test to make sure continuous scan is working

  }

}
