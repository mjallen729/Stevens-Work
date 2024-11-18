//Using a binary semaphore

#include <stdio.h>
#include <pthread.h>
#include <semaphore.h>

// Global variable shared among threads
long long int i = 0;

// Define a semaphore
sem_t semaphore;

// Function that increments the shared variable
void* increment_variable(void* arg) {
    for (int j = 0; j < 1000000000; j++) {
        sem_wait(&semaphore);  // Wait for access to the shared variable
        i++;
        sem_post(&semaphore);  // Release access to the shared variable
    }
    return NULL;
}

int main() {
    // Initialize the semaphore with an initial value of 1 (binary semaphore)
    sem_init(&semaphore, 0, 1);

    // Create five threads
    pthread_t threads[5];
    for (int j = 0; j < 5; j++) {
        pthread_create(&threads[j], NULL, increment_variable, NULL);
    }

    // Wait for all threads to finish
    for (int j = 0; j < 5; j++) {
        pthread_join(threads[j], NULL);
    }

    // Destroy the semaphore
    sem_destroy(&semaphore);

    // Print the final value of the shared variable
    printf("Final shared variable value: %lld\n", i);

    return 0;
}