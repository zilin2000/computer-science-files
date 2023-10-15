#ifndef MY_MALLOC_MY_MALLOC2_H
#define MY_MALLOC_MY_MALLOC2_H
#include <stdio.h>
#include <stdbool.h>
#include <unistd.h>
#include <pthread.h>

typedef struct datastructure{
    size_t size;
    struct datastructure * prev;
    struct datastructure * next;
} block_t;


block_t * head = NULL;
__thread block_t * TLS_head = NULL;
pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;


void *split(block_t * cur,size_t size, block_t ** head);
void *allocate_block(size_t size, int flag);
void merge_block(void *ptr);
block_t *find_bf(size_t size,block_t ** head);
void *bf_malloc(size_t size,block_t ** head, int flag);
void bf_free(void *ptr,block_t ** head);
block_t* initBlock(block_t * newSpace, size_t size);
void freelist_delete(block_t *block, block_t **head);
void freelist_add(block_t * block, block_t ** head);

//Thread Safe malloc/free: locking version
void *ts_malloc_lock(size_t size);
void ts_free_lock(void *ptr);

//Thread Safe malloc/free: non-locking version 
void *ts_malloc_nolock(size_t size);
void ts_free_nolock(void *ptr);
#endif //MY_MALLOC_MY_MALLOC2_H
