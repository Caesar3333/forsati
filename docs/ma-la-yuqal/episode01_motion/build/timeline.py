import json,sys
sys.path.insert(0,sys.argv[1]); from mapping import Map
M=sys.argv[1]; m=Map(M+'/map.json'); FPS=24
old=[0,2.80,6.25,11.30,15.25,17.10,18.00,18.92,20.75,26.75,29.55,34.05,37.10,40.40,44.20,47.05,51.80]
names=["S1","B1","B2","B3","S2","B4a","B4b","B4c","S3","S4","B5","B6","B7","B8","B9","S5"]
nb=[0.0]+[round(m(t)*FPS)/FPS for t in old[1:-1]]+[round(m.total*FPS)/FPS]
caps=json.load(open(M+'/../captions.json'))
ncaps=[[round(m(a)-0.04,3),round(m(b)+0.06,3),txt] for a,b,txt in caps]
tl={'fps':FPS,'total':nb[-1],'scenes':[{'name':n,'start':nb[i],'end':nb[i+1]} for i,n in enumerate(names)],'captions':ncaps}
json.dump(tl,open(M+'/timeline.json','w'),ensure_ascii=False,indent=1)
for s in tl['scenes']: print(f"{s['name']:4} {s['start']:6.2f}-{s['end']:6.2f}  {s['end']-s['start']:.2f}")
print('captions:',[(c[0],c[1]) for c in ncaps][:4],'...')
