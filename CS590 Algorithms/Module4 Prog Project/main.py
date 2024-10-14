# TODO driver to process input data / logic and interact with microservices
import enums.status_enum as status_enum

inputs = open('./test_cases.txt', 'r')


def process_input() -> dict[str, list | int]:
  '''
  Process test case input and return a dict containing
    k_highest: num of upgrade slots avail, 
    passengers: list of passenger data,
    cancels: list of passengers who canceled
  '''
  proc = dict()
  start = inputs.readline().split()
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
    cancels.append(int(inputs.readline().split()[0]))

  proc['cancels'] = cancels

  return proc

print(process_input())