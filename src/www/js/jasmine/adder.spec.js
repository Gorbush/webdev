describe("Jasmine Exercises 1 and 2", function() {

  /****************************************************************************/
  describe("WeirdAdder", function() {

    /**************************************************************************/
    class WeirdAdder {
      add(x, y) {
        let sum = x + y;

        // If odd:
        if (sum % 2 !== 0) {
          return this.foundOdd(sum);
        }

        return sum;
      }

      foundOdd(n) {
        console.log(`${n} is odd`);
        return n;
      }
    }

    /**************************************************************************/
    // Example:
    it("example testing weird adder class", function() {
      let adder = new WeirdAdder();
      expect(adder instanceof WeirdAdder).toBeTruthy();
    });

    /**************************************************************************/
    // Exercise 1:
    //
    // Write a test that verifies that the `add' method of the
    // `WeirdAdder' class correctly sums and returns its two
    // arguments.
    it("has add method which adds correctly", function() {
      let adder = new WeirdAdder();
      expect(adder.add).toBeDefined();
      expect(adder.add(1,3)).toBe(4);
    });


    /**************************************************************************/
    // Exercise 2:
    //
    // Using Jasmine spies, write a test that calls the `add' method
    // and confirm that the `foundOdd' method is also called.
    it("has foundOdd and it was called for sum 5", function() {
      let adder = new WeirdAdder();
      expect(adder.foundOdd).toBeDefined();
      spyOn(adder, "foundOdd").and.callThrough();
      expect(adder.add(1,4)).toBe(5);
      expect(adder.foundOdd).toHaveBeenCalledTimes(1);
    });

    it("has foundOdd and it was not called for sum 4", function() {
      let adder = new WeirdAdder();
      expect(adder.foundOdd).toBeDefined();
      spyOn(adder, "foundOdd").and.callThrough();
      expect(adder.add(1,3 )).toBe(4);
      expect(adder.foundOdd).toHaveBeenCalledTimes(0);
    });


  });
});
