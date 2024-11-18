//This program will build on the previous
//race.c program, but will add a mutex that
//prevents access to a shared variable so that
//no more than one thread can access it 
//simultaneously.

//mutex can slow down a program.
//this is an inefficent example

#include <stdio.h>
#include <pthread.h>

void *add(void *arg);
long long int i = 0;
pthread_mutex_t i_mutex;  //used for locking

int main(void) {
    pthread_attr_t threadattr;
    pthread_attr_init(&threadattr);

    pthread_t tid_add1, tid_add2, tid_add3,
        tid_add4, tid_add5;


    //initialize the mutex variable
    //NULL indicates default values
    if((pthread_mutex_init(&i_mutex, NULL)) != 0) {
        fprintf(stderr, "Error initializing mutex\n");
        return 1;
    }

    pthread_create(&tid_add1, &threadattr, add, NULL);
    pthread_create(&tid_add2, &threadattr, add, NULL);
    pthread_create(&tid_add3, &threadattr, add, NULL);
    pthread_create(&tid_add4, &threadattr, add, NULL);
    pthread_create(&tid_add5, &threadattr, add, NULL);

    pthread_join(tid_add1, NULL);
    pthread_join(tid_add2, NULL);
    pthread_join(tid_add3, NULL);
    pthread_join(tid_add4, NULL);
    pthread_join(tid_add5, NULL);

    printf("Sum is %lld\n", i);

    //destroy mutex
    if((pthread_mutex_destroy(&i_mutex)) != 0) {
        fprintf(stderr, "Error destroying mutex\n");
        return 1;
    }

    return 0;
}

//add function that will only allow one thread
//in the critical section at a time.

//in each iteration of the loop, the variable i is locked
//i is incremented by 1 and then the variable 
//i is unlocked.  This way no other threads
//can access the variable i until the update
//is complete.

//NOTE: the lock and unlock will occur
//5 billion times
void *add(void *arg) {
    for(long long int j = 1; j <= 1000000000; ++j)  {
        pthread_mutex_lock(&i_mutex);
        i++;
        pthread_mutex_unlock(&i_mutex);
    }

    return NULL;
}
