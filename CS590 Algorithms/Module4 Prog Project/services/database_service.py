# Abstracted methods to interact directly with the database (microservice)
# Priority is determined FIRST by status, then by time (lower nums = longer time)
import db.pqueue as DB
import enums.status_enum as status_enum
from collections import defaultdict

# TODO turn this into a class so it doesn't persist across diff test cases
id_cache: dict[int, dict] = dict()
database = DB.pqueue()  # min heap

# Get k highest priority passengers
# Remember to check for ties based on status
def get_top_k(k: int):
  eligible_by_status = defaultdict(list)
  count = k
  ret = list()

  lowest_status = -1
  for i in range(k):
    elem = database.pop()  # (status_enum, flyer_id)
    lowest_status = max(lowest_status, elem[0])

    eligible_by_status[elem[0]].append(id_cache[elem[1]])

  # check for ties in the status
  next_eligible = database.peek()  # (status_enum, flyer_id)

  if next_eligible and next_eligible[0] == lowest_status:
    while next_eligible and next_eligible[0] == lowest_status:
      elem = database.pop()
      eligible_by_status[elem[0]].append(id_cache[elem[1]])
      count += 1

      next_eligible = database.peek()

    # another heap sorted by time within the lowest status (lower time = higher priority)
    tie_break = DB.pqueue()
    for passenger in eligible_by_status[lowest_status]:
      to_push = (passenger['time'], passenger['id'])
      tie_break.push(to_push)

    count -= len(eligible_by_status[lowest_status])
    eligible_by_status[lowest_status] = []
    
    # pop the number of elements from tie_break needed to meet k
    while count != k:
      elem = tie_break.pop()  # (time, flyer_id)
      eligible_by_status[lowest_status].append(id_cache[elem[1]])
      count += 1

  for status in eligible_by_status:
    for passenger in status:
      ret.append(passenger)

  assert len(ret) == k
  return ret

# Add a passenger to the database and cache
# passenger_data is a dict of keys [name, id, time, status]
def add_passenger(passenger_data: dict):
  id_cache[passenger_data['id']] = passenger_data

  to_push = (status_enum(passenger_data['status']), passenger_data['id'])
  database.push(to_push)

# Remove passenger from database and cache
def cancel_passenger(flyer_id: int):
  to_remove = (status_enum(id_cache[flyer_id]['status']), flyer_id)
  database.remove(to_remove)

  id_cache[flyer_id] = None
