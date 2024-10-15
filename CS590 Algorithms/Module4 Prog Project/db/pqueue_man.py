# A priority queue that stores information about passengers on upgrade list
# Each entry in the queue is a tuple of (status_enum, flyer_id) or (time, flyer_id)
class pqueue:
  def __init__(self, data: list = []) -> None:
    self.minheap = list()

    for d in data:
      self.push(d)

  def __heapify(self, data: list):
    self.minheap = []
    for d in data:
      self.push(d)

  def __len__(self) -> int:
    return len(self.minheap)
  
  def __get_left_child_index(self, parent_index: int) -> int | None:
    idx = 2 * parent_index + 1
    return idx if idx < len(self.minheap) else None
  
  def __get_right_child_index(self, parent_index: int) -> int | None:
    idx = 2 * parent_index + 2
    return idx if idx < len(self.minheap) else None
  
  def __get_parent_index(self, child_index: int) -> int | None:
    idx = (child_index - 1) // 2
    return idx if idx >= 0 else None
  
  def __swap(self, idxa: int, idxb: int):
    if idxa >= len(self.minheap) or idxb >= len(self.minheap):
      print('Invalid swap on heap!')
      return
    
    self.minheap[idxa], self.minheap[idxb] = self.minheap[idxb], self.minheap[idxa]

  def __bubble_up(self, child_idx: int = None):
    if child_idx == None:
      child_idx = len(self.minheap) - 1

    parent_idx = self.__get_parent_index(child_idx)
    if parent_idx != None and self.minheap[child_idx][0] < self.minheap[parent_idx][0]:
      self.__swap(child_idx, parent_idx)
      self.__bubble_up(child_idx= parent_idx)

    return self.minheap
  
  def __bubble_down(self, idx: int = 0):
    if idx >= len(self.minheap) or not self.__get_left_child_index(idx):
      return self.minheap
    
    idx_smaller = self.__get_left_child_index(idx)
    right_child = self.__get_right_child_index(idx)
    if right_child != None and self.minheap[right_child][0] < self.minheap[idx_smaller][0]:
      idx_smaller = right_child

    if self.minheap[idx][0] < self.minheap[idx_smaller][0]:
      return self.minheap
    
    if self.minheap[idx][0] > self.minheap[idx_smaller][0]:
      self.__swap(idx, idx_smaller)
      return self.__bubble_down(idx_smaller)
  
  def push(self, item: tuple) -> None:
    self.minheap.append(item)
    self.__bubble_up()

  def peek(self) -> tuple:
    if len(self.minheap) < 1:
      return None
    
    return self.minheap[0]
  
  def pop(self) -> tuple:
    if len(self.minheap) < 1:
      return None
    
    removed = self.minheap[0]
    self.minheap[0] = self.minheap[len(self.minheap) - 1]
    self.minheap.pop()

    self.__bubble_down()
    return removed

  def remove(self, item: tuple) -> None:
    for i in range(len(self.minheap)):
      if self.minheap[i] == item:
        self.minheap[i] = self.minheap[-1]
        self.minheap.pop()
        
        self.__heapify(self.minheap)
        break


