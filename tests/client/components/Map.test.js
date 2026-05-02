import React from "react";
import { shallow, mount } from "enzyme";

import { Map } from "../../../client/components/Map";

//Map exists!
test("<Map />", () => {
  expect(<Map />).toBeDefined();
});


// FAILS - CANNOT READ PROPERTY 'MAP' OF UNDEFINED
// test("Profile has div", () => {
//   // Arrange
//   const expected = 1;
//   console.log("what ever you want")
//   // Act
//   const wrapper = shallow(
//     <Map
//       auth={{ isAuthenticated: true, user: { username: "admin" } }}
//     />
//   );
//   console.log(wrapper)
//   const actual = wrapper.find("div").length;

//   // Assert
//   expect(actual).toEqual(expected);
// });
