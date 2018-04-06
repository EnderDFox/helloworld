class Hello1{
    func1(){
        console.log("[info]","This is hello 1",entitas.Pool);
        console.log("[info]","---------2018-04-06 13:48:21-----------");
        console.log(example.CoreComponentIds.ColorAnimation)
        console.log(example.CoreComponentIds.ColorAnimation.toString())
        console.log(example.CoreComponentIds[example.CoreComponentIds.ColorAnimation])
        console.log("[info]","--------------------");
        var systems:entitas.Systems;
        example.Pools.pool.createEntity
        systems = new entitas.Systems().add(example.Pools.pool.createSystem(example.MovementSystem))
        var e = example.Pools.pool.createEntity('m1');
        e.addVelocity(1,3)
        e.addPosition(7,9)
        systems.initialize()
        systems.execute()
    }
}
new Hello1().func1()