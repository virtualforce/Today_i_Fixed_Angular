## Problem
Subscribing to the observable manually in the `ngOnInit()` doesn’t work with `OnPush` change detection strategy. 

## Environment
- Angular version : Angular 2+

## How you fix it
Solution works with `OnPush` change detection out of the box! By using of `| Async` pipe. Angular handles subscriptions of | async pipes for us automatically so there is no need to unsubscribe manually in the component using ngOnDestroy. This leads to less verbosity and hence less possibilities for making a mistake. 

## Solution
We look for a to-do list as an example, then we subscribe to the list from the store by using | Async pipe directly in a template like:
``` 
export class TodosComponent implements OnInit {  
  todos$: Observable<Todo[]>;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.todos$ = this.store.pipe(select(selectTodos))
  }
} 

//Component's template
    <ul *ngIf="(todos$ | async).length">
      <li *ngFor="let todo of todos$ | async">{{todo.name}}</li>
    </ul> 
```
