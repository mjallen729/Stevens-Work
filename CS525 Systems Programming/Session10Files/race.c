//Intentionally cause a race condition
//This program should add 1 to a variable on every iteration.
//There are 5 threads and each thread adds 1 up to 1000000000.
//BUT each thread adds 1 simultaneously, it never reaches
//5000000000.  Each time a thread accesses the variable
//it takes the current value of i and adds 1.  During this
//time, another thread might also read the current value of i
//and add 1 which overwrites the added 1 previously added.
//The threads are overwriting each other.

#include <stdio.h>
#include <pthread.h>


void *add(void *arg);
long long int i = 0;

int main(void) {
    //thread attributes
    pthread_attr_t threadattr;
    pthread_attr_init(&threadattr);

   //Create 5 threads    
    pthread_t tid_add1, tid_add2, tid_add3,
        tid_add4, tid_add5;

    pthread_create(&tid_add1, &threadattr, add, NULL);
    pthread_create(&tid_add2, &threadattr, add, NULL);
    pthread_create(&tid_add3, &threadattr, add, NULL);
    pthread_create(&tid_add4, &threadattr, add, NULL);
    pthread_create(&tid_add5, &threadattr, add, NULL);

    //force the application to wait until all threads
    //are complete    
    pthread_join(tid_add1, NULL);
    pthread_join(tid_add2, NULL);
    pthread_join(tid_add3, NULL);
    pthread_join(tid_add4, NULL);
    pthread_join(tid_add5, NULL);

    printf("Sum is %lld\n", i);
    return 0;
}

//add function that will run inside the threads
//return null since a value is required
//each thread may enter the critical section
//simultaneously
void *add(void *arg) {
    for(long long int j = 1; j <= 1000000000; ++j) 
        i++;
    return NULL;
}
