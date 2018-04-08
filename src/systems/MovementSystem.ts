module example {

  import Pool = entitas.Pool;
  import Group = entitas.Group;
  import Entity = entitas.Entity;
  import Matcher = entitas.Matcher;
  import Exception = entitas.Exception;
  import TriggerOnEvent = entitas.TriggerOnEvent;
  import IExecuteSystem = entitas.IExecuteSystem;
  import ISetPool = entitas.ISetPool;

  export class MovementSystem implements IExecuteSystem, ISetPool,entitas.IInitializeSystem {

    protected pool: Pool;
    protected group: Group;

    public execute() {
      var entities = this.group.getEntities();
      console.log("[debug]","this.group.getEntities();",entities.length);
      for (var i = 0, l = entities.length; i < l; i++) {
        var e = entities[i];
        if(e.hasPosition){
          console.log("[log] position:", e.position.x, e.position.y);
        }
        if(e.hasVelocity){
          console.log("[log] velocity:", e.velocity.x, e.velocity.y);
        }
      }
      console.log("pre a addComp")
      // e.addMyCompA(true)
    }

    public initialize(){
      console.log("[debug]","system.initialize");
      var entities = this.group.getEntities();
      console.log("[debug]","this.group.getEntities();",entities.length);
      for (var i = 0, l = entities.length; i < l; i++) {
        var e = entities[i];
        console.log("[debug]","init entity",i);
        e.onComponentAdded.add((e,index, component) => {
          console.log("[debug]", "e.onComponentAdded.add(:", index,example.CoreComponentIds[index]);
        })
        e.onComponentReplaced.add((e,index, component) => {
          console.log("[debug]", "e.onComponentReplaced.add(:", index,example.CoreComponentIds[index]);
        })
      }
    }

    public setPool(pool: Pool) {
      console.log("[debug]","system.setPool");
      this.pool = pool;
      this.group = pool.getGroup(Matcher.anyOf(example.CoreComponentIds.Position, example.CoreComponentIds.Velocity,example.CoreComponentIds.Score));
      
      this.group.onEntityAdded.add((group, entity, index, component) => {
        console.log("[debug]", "this.group.onEntityAdded.add(",entity.name,entity.id, index, example.CoreComponentIds[index]);
      })
      this.group.onEntityUpdated.add((group, entity, index, component) => {
        console.log("[debug]", "this.group.onEntityUpdated.add(",entity.name,entity.id, index, example.CoreComponentIds[index]);
      })
      this.group.onEntityRemoved.add((group, entity, index, component) => {
        console.log("[debug]", "this.group.onEntityRemoved.add(",entity.name,entity.id, index, example.CoreComponentIds[index]);
      })
    }
  }
}