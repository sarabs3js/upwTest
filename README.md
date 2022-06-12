# upwork Test

A simple form with given input fields and unique validations for each.

I have made this using pure VueJs framework.

### Hosted URL

https://fluffy-cat-121b18.netlify.app

Application is deployed here to quickly review the output.


### Test Cases
`npm run test:e2e` for Testing all the given scenarios

#### Tasks

- [x] Crete a form with 3 given fields
- [x] Add required and min 3 validations to Username
- [x] Add required and auto-fill validations for country field
- [x] Add required and Tax format validations to the field
- [x] Show validation message below the input
- [x] Make Ajax (fetch) call
- [x] Show Error message if status code is not 200 
- [x] Show success message if status code is equal to 200
- [x] Written cypress tests for each of the above scenario
- [ ] Use Bootstrap / rapid CSS framework
- [x] Custom CSS

### Further Enhanement

- Implement Dirty and touch state to manage showing of error messages in more control way.
- Some more test cases can be written for AutoComplete component, but due to shortage of time it's not there.
- However, E2E test cases are covering all of the mentioned conditions.
- For resetting the form I have used a kind of hack at the moment by reseting the form directly. Somehow resetting the reactive state is not reflecting in the child input fields.

https://media.giphy.com/media/TBZEgKryt6NSPXUKBG/giphy.gif

I hope you will enjoy reviewing the code as much as I enjoyed while writing it ❤️ 