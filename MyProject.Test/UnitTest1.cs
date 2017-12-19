using System;
using Xunit;

namespace MyProject.Test
{
    public class UnitTest1
    {
        /// <summary>测试ulong和uint的互相转化</summary>
        [Fact]
        public void TestUlongUintTranslate(){
            ulong sp = (ulong)uint.MaxValue+1;
            // bool tempVar = false; if (tempVar == false) return false;
            ulong b = (ulong)uint.MaxValue * 4;
            Console.WriteLine(b+"{b}");
            Console.WriteLine(uint.MaxValue+"{uint.MaxValue}");
            uint hi = (uint)(b / sp);
            uint low = (uint)(b % sp);
            Console.WriteLine(hi+"{hi}");
            Console.WriteLine(low+"{low}");
            ulong b2 = hi*sp + low;
            Console.WriteLine(b2+"{b2}");
            Assert.Equal(b.ToString(),"17179869180");
            Assert.Equal(uint.MaxValue.ToString(),"4294967295");
            Assert.Equal(hi.ToString(),"3");
            Assert.Equal(low.ToString(),"4294967292");
            Assert.Equal(b2.ToString(),"17179869180");
        }
/*
        #region Sample_TestCode
        [Theory]
        [InlineData(-1)]
        [InlineData(0)]
        [InlineData(1)]
        public void ReturnFalseGivenValuesLessThan2(int value)
        {
            bool result = value>0;
            Assert.False(result, $"{value} should not be prime");
            Assert.Equal(3,value)
            
        }
        #endregion
        
 */
    }
}
