# Returns a numbered priority based on status (lower num = higher status)
# Super > Platinum > Gold > Silver
def enum(status: str):
  status_map = {
    'Super': 1,
    'Platinum': 2,
    'Gold': 3,
    'Silver': 4
  }

  return status_map[status] if status in status_map else None