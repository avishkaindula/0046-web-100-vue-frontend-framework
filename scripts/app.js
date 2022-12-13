const TodosApp = {
  // TodosApp should start with a capital letter.
  data() {
    return {
      newTodo: "Learn Vue.js!",
      enteredTodoText: "",
    };
  },
  methods: {
    // This holds methods (functions) we wanna execute with help of vue.
    saveTodo(event) {
      event.preventDefault();
      this.newTodo = this.enteredTodoText;
      // this. refers to methods: object.
      // but if you use this. inside of a method that is registered in this
      // methods object, vue will wire it  up to the data(){} object instead.
      // So we can access .newTodo from here. Now this will change the
      // value of newTodo to the value we entered on this.newTodo
      // We can wire this method to the form on index.html by using <form @submit="saveTodo">
      // So when we hit save button and submit the form, the text will be changed
      // in all places of index.html where we use {{ newTodo }}

      // this.newTodo = this.enteredTodoText; will assign what we've typed in 
      // the input field to the <h2> and <p> elements.
      this.enteredTodoText = "";
      // This will clear the input field after the form is submitted.
    },
  },
};

Vue.createApp(TodosApp).mount("#todos-app");
// mount() method will allow us to connect the TodosApp above to
// a certain part in our HTML code. It should be a parent element
// of html elements which we wanna interact with vue.js
// We can add #todos-app id to main element so that we can
// interact with the <form> and and <ul> inside it with
// the help of vue.js
