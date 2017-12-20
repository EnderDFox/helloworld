using System;
using System.Web.Razor;
using RazorEngine;
using RazorEngine.Templating;

namespace MyProject
{
    // public class Model1
    // {
        // string Name = "ww";
    // }
    public class Class1
    {
        static void Main(string[] args)
        {
            var template = "Hello @Model.Name, welcome to use RazorEngine!";
            var result = Engine.Razor.RunCompile(template, "templateKey1", null, new { Name = "World" });
            Console.WriteLine(result);
            Console.Read();
        }
        public static int check(int val)
        {
            return val;
        }
    }
}
