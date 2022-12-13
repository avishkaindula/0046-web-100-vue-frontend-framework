const TodosApp = {
  // TodosApp should start with a capital letter.
  data() {
    return {
      newTodo: "Learn Vue.js!",
    };
  },
};

Vue.createApp(TodosApp).mount("#todos-app");
// mount() method will allow us to connect the TodosApp above to
// a certain part in our HTML code. It should be a parent element
// of html elements which we wanna interact with vue.js
// We can add #todos-app id to main element so that we can
// interact with the <form> and and <ul> inside it with
// the help of vue.js
