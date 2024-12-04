from collections import deque

# main algorithm which runs in O(n + m) time
# returns list of reachable stations <= radius away from start
def findReachable(graph, start, radius) -> list:
  q = deque()  # (station, depth)
  visited = set()
  reachable = []

  q.append((start, 0))
  while len(q) > 0:
    cur, depth = q.popleft()
    if depth > radius or cur in visited:
      continue

    visited.add(cur)
    reachable.append(cur)

    for neighbor in graph[cur]:
      if neighbor not in visited:
        q.append((neighbor, depth + 1))

  return reachable

# load testcases into the testcases list
testcases = []
with open('./testcases.txt', 'r') as file:
  rawText = file.read().split('\n')
  case = dict()

  for i in range(len(rawText)):
    if rawText[i] == 'Input:':
      # next 3 lines are input for the test case
      case['n'] = int(rawText[i+1].split()[-1])
      case['m'] = int(rawText[i+2].split()[-1])

      linksRaw = rawText[i+3].split('=')[-1][2:-2].replace('(','').replace(')','').split(',')
      links = []
      pair = None
      for i in range(0, len(linksRaw), 2):
        pair = (int(linksRaw[i]), int(linksRaw[i+1]))
        links.append(pair)
      
      case['links'] = links
      testcases.append(case)
      case = dict()

# now we will execute each test case
for case in testcases:
  nodes = case['n']
  links = case['links']

  # create the graph
  adjList = [[] for _ in range(nodes)]
  for l in links:
    adjList[l[0]].append(l[1])
    adjList[l[1]].append(l[0])  # undirected graph = "two way street"

  # print list of reachable nodes for each node
  for n in range(len(adjList)):
    print(f'Reachable stations from station {n}: {findReachable(adjList, n, 4)}')

  print()  # newline marks end of each case for readability