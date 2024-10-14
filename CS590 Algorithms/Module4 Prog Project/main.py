# Driver to process input data / logic and interact with microservices
import services.database_service as dbserv

inputs = open('./test_cases.txt', 'r')

def process_input() -> dict[str, list | int] | None:
  '''
  Process a test case input and return a dict containing
    k_highest: num of upgrade slots avail, 
    passengers: list of passenger data,
    cancels: list of passengers who canceled
  '''
  proc = dict()
  start = inputs.readline().split()

  if not start:
    return None

  num_flyers = int(start[0])
  proc['k_highest'] = int(start[1])
  num_cancels = int(start[2])

  inputs.readline()  # process empty line
  passengers = list()
  for i in range(int(num_flyers)):
    passenger = inputs.readline().split()
    passengers.append({
      'name': passenger[0],
      'id': int(passenger[1]),
      'time': int(passenger[2]),
      'status': passenger[3]

    })

  proc['passengers'] = passengers

  inputs.readline()  # process empty line
  cancels = list()
  for i in range(num_cancels):
    line = inputs.readline()
    cancels.append(int(line.split()[0]))

  proc['cancels'] = cancels
  inputs.readline()  # process empty line after test case

  return proc

c = 0
while c := c + 1:
  processed = process_input()
  if not processed:
    break
  
  print(f'\nRESULT OF TEST {c}:')
  database = dbserv.DatabaseService()

  # add the passengers to the database
  for passenger in processed['passengers']:
    database.add_passenger(passenger)

  # cancel any who wish to cancel
  for flyer_id in processed['cancels']:
    database.cancel_passenger(flyer_id)

  # return list of passengers eligible for k upgrade slots
  eligible = database.get_top_k(processed['k_highest'])

  for p in eligible:
    print(p)