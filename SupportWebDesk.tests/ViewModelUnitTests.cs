using System;
using Xunit;
using SupportWebDesk.Data.ViewModels;

namespace SupportWebDesk.tests
{
    public class ViewModelUnitTests
    {
        [Fact]
        public void StatusVMAssignTest()
        {
            var vm = new TicketStatusChangeViewModel();
            Assert.NotNull(vm);
            Assert.Null(vm.Status);
            Assert.Equal(default(int), vm.TicketId);
            vm.Status = "test";
            vm.TicketId = 1;
            Assert.NotNull(vm.Status);
            Assert.Equal("test", vm.Status);
            Assert.Equal(1, vm.TicketId);
        }

        [Fact]
        public void PriorityVMAssignTest()
        {
            var vm = new TicketPriorityChangeViewModel();
            Assert.NotNull(vm);
            Assert.Null(vm.Priority);
            Assert.Equal(default(int), vm.TicketId);
            vm.Priority = "test";
            vm.TicketId = 1;
            Assert.NotNull(vm.Priority);
            Assert.Equal("test", vm.Priority);
            Assert.Equal(1, vm.TicketId);
        }
    }
}
