//This program will run similar to the threaded
//program, but is much more efficient.

#include <stdio.h>

int main(void) {
    long long int i = 0;
    
    for (int x = 0; x < 5; ++x) {
        for (long long int j = 0; j < 1000000000; ++j) {
            i++;
        }
    }
    printf("Sum is %lld\n", i);
    return 0;
}
