package main

import "fmt"

type Integer int

func Integer_Less(a Integer, b Integer) bool {
	return a < b
}

func main2() {
	var a Integer = 1
	if Integer_Less(a, 2) {
		fmt.Println(a, "Less 2")
	}
}
