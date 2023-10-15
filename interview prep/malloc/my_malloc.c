#include "my_malloc.h"

/**
 * allocate new block，different from hw1 we add a flag variable to determine whether we use lock in sbrk
*/
void *allocate_block(size_t size, int flag){
    block_t * new  = NULL;
     if (flag == 0){
        new = sbrk(size + sizeof(block_t));
    }
    else{
        pthread_mutex_lock(&lock);
        new = sbrk(size + sizeof(block_t));
        pthread_mutex_unlock(&lock);
    }
      //error handling
  if(new == (void *) -1){
    perror("Cannot sbrk()");
    return NULL;
  }
    //initialize the variables
    return (void*) initBlock(new, size);
    // return (void *)new;
}
/**
 * function to initizlize the new block
*/
block_t* initBlock(block_t * newSpace, size_t size) {
  newSpace->next = NULL;
  newSpace->prev = NULL;
  newSpace->size = size;
  return newSpace;
}

/**
 * add the block into the free list
*/
void freelist_add(block_t * block, block_t ** head){
    //means the block will become the new head
    if ((*head == NULL) || (block < *head))
    {
        block->prev = NULL;
        block->next = *head;
        if (block->next != NULL)
        {
            block->next->prev = block;
        }
        *head = block;
    }
    //means we have to loop the free list
    else{
        block_t * current = *head;
        while ((current->next != NULL) && (block > current->next)) {
                current = current->next;  
    }
    block->prev = current;
    block->next = current->next;
    current->next = block;
    if (block->next != NULL) {
      block->next->prev = block;
    }
    }
}




void* split(block_t* cur, size_t size, block_t** head) {
    // Calculate the address of the second block
    block_t* new = (block_t*)((void*)cur + size + sizeof(block_t));
    
    // Add the new block to the free list and remove the current block
    freelist_add(new, head);
    freelist_delete(cur, head);
    
    // Set the size of the two blocks
    new->size = cur->size - size - sizeof(block_t);
    cur->size = size;

    // Return a pointer to the first block
    return (void*)cur;
}


void merge_block(void *ptr){
    block_t * curr = ptr;   // cast ptr to a pointer to a block_t struct and assign it to curr
    block_t *prevONE = curr->prev;  // get the previous block from the current block
    block_t *nextONE = curr -> next;  // get the next block from the current block

    // Merge with the next block if it is free and adjacent to the current block
    if (nextONE && (void *)curr + sizeof(block_t) + curr->size == nextONE) {
        curr->size += sizeof(block_t) + nextONE->size;  // merge the two blocks
        curr->next = nextONE->next;  // set the next pointer of the current block to skip the next block
        if (nextONE->next) {
            nextONE->next->prev = curr;  // update the previous pointer of the next block to point to the current block
        }
    }

    // Merge with the previous block if it is free and adjacent to the current block
    if (prevONE && (void *)prevONE + sizeof(block_t) + prevONE->size == curr) {
        prevONE->size += sizeof(block_t) + curr->size;  // merge the two blocks
        prevONE->next = curr->next;  // set the next pointer of the previous block to skip the current block
        if (curr->next) {
            curr->next->prev = prevONE;  // update the previous pointer of the next block to point to the previous block
        }
    }
}

/**
 * delete a block from freelist
*/
void freelist_delete(block_t *block, block_t **head) {
    // Check if block is the only block in the list
    if (block->next == NULL && block->prev == NULL) {
        *head = NULL;
    }
    // Check if block is the last block in the list
    else if (block->next == NULL) {
        block->prev->next = NULL;
    }
    // Check if block is the head of the list
    else if (*head == block) {
        *head = block->next;
        block->next->prev = NULL;
    }
    // Block is neither the only block, the last block, nor the head of the list
    else {
        block->next->prev = block->prev;
        block->prev->next = block->next;
    }
    // Set block's prev and next pointers to NULL
    block->next = NULL;
    block->prev = NULL;
}
block_t *find_bf(size_t size,block_t ** head){
    // Check if head is null
    if (*head == NULL) {
        return NULL;
    }

    // Initialize variables
    block_t *cur = *head;
    block_t *output = NULL;

    // Loop through each block in the linked list
    while (cur != NULL) {
        // Check if block size is greater than or equal to requested size
        if (cur->size >= size) {
            // Check if block size is equal to requested size
            if (cur->size == size) {
                return cur;
            }
            // Check if output is null or current block is smaller than output
            if (output == NULL || cur->size < output->size) {
                output = cur;
            }
        }
        // Move to next block in linked list
        cur = cur->next;
    }

    return output;
}

void *bf_malloc(size_t size, block_t ** head, int flag){
    // Find the smallest free block that can accommodate the requested size
    block_t *target = find_bf(size, head);
    if (target != NULL) {
        // If the block can be split into two smaller blocks to minimize waste
        size_t sz = target->size - sizeof(block_t);
        if ( sz > size) {
            // Split the block and return a pointer to the new block that can be used for allocation
            return (void*)split(target, size, head) + sizeof(block_t);
        } else {
            // If the block cannot be split, remove it from the free list and return a pointer to the block for allocation
            freelist_delete(target, head);
            return (void*)target + sizeof(block_t);
        }
    } else {
        // If no suitable free block is found, allocate a new block from the operating system and return it for allocation
        return (void*)allocate_block(size, flag) + sizeof(block_t);
    }
}

void bf_free(void *ptr, block_t **head){
    block_t * current = (block_t *)(ptr - sizeof(block_t));
    freelist_add(current,head);
    merge_block(current);
}

//Thread Safe malloc/free: locking version
void *ts_malloc_lock(size_t size){
    pthread_mutex_lock(&lock);
    void * block = bf_malloc(size, &head, 0);
    pthread_mutex_unlock(&lock);
    return block;
}

void ts_free_lock(void *ptr){
    pthread_mutex_lock(&lock);
    bf_free(ptr, &head);
    pthread_mutex_unlock(&lock);
}

//Thread Safe malloc/free: non-locking version 
void *ts_malloc_nolock(size_t size){
    void * p = bf_malloc(size, &TLS_head, 1);
    return p;
}
void ts_free_nolock(void *ptr){
    bf_free(ptr, &TLS_head);
}
