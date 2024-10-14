# TODO a priority queue that stores information about passengers on upgrade list
# Each entry in the queue is a tuple of (status_enum, flyer_id)
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
    for i in range(self.minheap):
      if self.minheap[i] == item:
        self.minheap[i] = self.minheap[-1]
        self.minheap.pop()
        heapq.heapify(self.minheap)
        break