# Returns a numbered priority based on status (greater num = higher status)
# Super > Platinum > Gold > Silver
def enum(status: str):
  status_map = {
    'Super': 4,
    'Platinum': 3,
    'Gold': 2,
    'Silver': 1
  }

  return status_map[status] if status in status_map else None