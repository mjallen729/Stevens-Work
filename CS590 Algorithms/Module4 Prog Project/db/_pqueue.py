# A priority queue that stores information about passengers on upgrade list
# Each entry in the queue is a tuple of (status_enum, flyer_id)

# NOTE: this is a placeholder file I used to test the rest of the project while building
import heapq

class pqueue:
  def __init__(self) -> None:
    self.minheap = list()

  def push(self, item: tuple) -> None:
    heapq.heappush(self.minheap, item)

  def peek(self) -> tuple:
    if len(self.minheap) >= 1:
      return self.minheap[0]
    
    return None
  
  def pop(self) -> tuple:
    return heapq.heappop(self.minheap)
  
  def remove(self, item: tuple) -> None:
    for i in range(len(self.minheap)):
      if self.minheap[i] == item:
        self.minheap[i] = self.minheap[-1]
        self.minheap.pop()
        heapq.heapify(self.minheap)
        break