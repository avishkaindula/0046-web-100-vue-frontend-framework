const TodosApp = {
  // TodosApp should start with a capital letter.
  data() {
    return {
      // newTodo: "Learn Vue.js!",
      isLoading: false,
      todos: [],
      enteredTodoText: "",
      editedTodoId: null,
    };
  },
  methods: {
    // This holds methods (functions) we wanna execute with help of vue.
    async saveTodo(event) {
      event.preventDefault();
      // this.newTodo = this.enteredTodoText;
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

      // this.enteredTodoText = "";
      // This will clear the input field after the form is submitted.

      if (this.editedTodoId) {
        // Updating an existing todo
        const todoId = this.editedTodoId;

        const todoIndex = this.todos.findIndex(function (todoItem) {
          // return todoItem.id === this.editedTodoId;
          // if we use this. in a function like this, that this. won't
          // refer to the data: method. Instead that this. is referred
          // to this anonymous function. So we need to create todoId
          // constant outside of this anonymous function and and access
          // the data: method. Then we can assign that constant to
          // todoItem.id like following.
          return todoItem.id === todoId;
        });
        // findIndex() will return a index of the item we're looking for in the array.

        const updatedTodoItem = {
          id: this.todos[todoIndex].id,
          text: this.enteredTodoText,
          // This will update the text inside todo with the newly inserted text in the input field
          // when we hit the save button.
        };

        this.todos[todoIndex] = updatedTodoItem;
        // This will assign the updated object to the todos array.
        this.editedTodoId = null;

        let response;

        try {
          response = await fetch("http://localhost:3000/todos/" + todoId, {
            method: "PATCH",
            body: JSON.stringify({
              newText: this.enteredTodoText,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
        } catch (error) {
          alert("Something went wrong!");
          return;
        }

        if (!response.ok) {
          alert("Something went wrong!");
          return;
        }
      } else {
        // Creating new todo
        // The following code is copied from the createTodo() function of todos.js
        let response;

        try {
          response = await fetch("http://localhost:3000/todos", {
            method: "POST",
            body: JSON.stringify({
              text: this.enteredTodoText,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
        } catch (error) {
          alert("Something went wrong!");
          return;
        }

        if (!response.ok) {
          alert("Something went wrong!");
          return;
        }

        const responseData = await response.json();

        const newTodo = {
          text: this.enteredTodoText,
          id: responseData.createdTodo.id,
        };

        this.todos.push(newTodo);
        // So now when saveTodo is triggered, a newTodo object will be added to this todos: [] array.
        //  [ { text: "text entered in the input field" , id: 2022-12-13T14:48:00.000Z } ]
        // We've accessed this text: key when we've wrote { todo.text }} in index.html
      }

      this.enteredTodoText = "";
    },

    startEditTodo(todoId) {
      // We need to pass todo.id from the Edit button of index.html into this todoId parameter.
      this.editedTodoId = todoId;
      const todo = this.todos.find(function (todoItem) {
        return todoItem.id === todoId;
        // This will set the id of todoItem by the value of todoId
      });
      this.enteredTodoText = todo.text;
      // This will load the text on todo into the input field when hitting edit button.
    },

    async deleteTodo(todoId) {
      this.todos = this.todos.filter(function (todoItem) {
        return todoItem.id !== todoId;
        // This will keep the items which the todoId does not fit the item's id
        // and drop the item which the todoId does fit the item's id
      });

      let response;

      try {
        response = await fetch("http://localhost:3000/todos/" + todoId, {
          method: "DELETE",
        });
      } catch (error) {
        alert("Something went wrong!");
        return;
      }

      if (!response.ok) {
        alert("Something went wrong!");
        return;
      }
    },
  },
  async created() {
    let response;
    this.isLoading = true;
    try {
      response = await fetch("http://localhost:3000/todos");
    } catch (error) {
      alert("Something went wrong!");
      this.isLoading = false;
      return;
    }

    this.isLoading = false;

    if (!response.ok) {
      alert("Something went wrong!");
      return;
    }

    const responseData = await response.json();
    this.todos = responseData.todos;
  },
};

Vue.createApp(TodosApp).mount("#todos-app");
// mount() method will allow us to connect the TodosApp above to
// a certain part in our HTML code. It should be a parent element
// of html elements which we wanna interact with vue.js
// We can add #todos-app id to main element so that we can
// interact with the <form> and and <ul> inside it with
// the help of vue.js
