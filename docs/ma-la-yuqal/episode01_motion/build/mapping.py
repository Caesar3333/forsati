import json
class Map:
    def __init__(s,path):
        d=json.load(open(path)); s.tempo=d['tempo']; s.bp=d['bp']; s.total=d['total']
        s.lead=s.bp[0][1]; s.jumps=[]
        for i in range(1,len(s.bp)-1,2): s.jumps.append((s.bp[i][0], s.bp[i+1][1]-s.bp[i][1]))
    def __call__(s,t):
        x=t/s.tempo; return x+s.lead+sum(e for m,e in s.jumps if m<=x)
