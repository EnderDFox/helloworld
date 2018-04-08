class Hello1{

    func1(){
        console.log("[info]","This is hello 1",entitas.Pool);
        console.log("[info]","---------2018-04-06 13:48:21-----------");
        console.log(example.CoreComponentIds.ColorAnimation)
        console.log(example.CoreComponentIds[example.CoreComponentIds.ColorAnimation])
        console.log("[info]","--------------------");
        var systems:entitas.Systems;
        example.Pools.pool.createEntity
        systems = new entitas.Systems().add(example.Pools.pool.createSystem(example.MovementSystem))
        //--
        var e = example.Pools.pool.createEntity('m1');
        e.addVelocity(1,3)
        e.addPosition(7,9)
        // e.addPosition(7,9) -- is error when add twice
        var e2 = example.Pools.pool.createEntity("b1");
        e2.addHealth(17,39)
        e2.addVelocity(14, 5);
        //--
        systems.initialize()
        systems.execute()
        e.addMyCompA(true,[3,4,5],[new Hello2()])
        e.replacePosition(14, 5)
        e.addHealth(300,1300)
        e.replaceHealth(3030,13400)
        example.Pools.pool.setScore(13)
        // example.Pools.pool.setScore(17)
        example.Pools.pool.replaceScore(19)
        example.Pools.pool.destroyEntity(e2)
        // e.replaceMyCompA(false)
    }

}