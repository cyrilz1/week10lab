import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";

@Component({
  selector: "app-actor",
  templateUrl: "./actor.component.html",
  styleUrls: ["./actor.component.css"],
})
export class ActorComponent implements OnInit {
  actorsDB: any[] = [];
  movieDB:any[] = [];

  section = 1;
  fullName: string = "";
  bYear: number = 0;
  actorId: string = "";
  //Movie title
  mTitle:string = "";
  mYear:number = 0;
  beYear:number = 0;
  movieId:string = "";

  constructor(private dbService: DatabaseService) {}

  //Get all Actors
  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }

  //Get all Movie
  onGetMovie() {
    this.dbService.getMovie().subscribe((data: any[]) => {
      this.movieDB = data;
    });
  }


  //Create a new Actor, POST request
  onSaveActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.createActor(obj).subscribe(result => {
      this.onGetActors();
    });
  }

  //Create new Movie, POST request
  onSaveMovie(){
    let obj = { title: this.mTitle, year: this.mYear };
    this.dbService.createMovie(obj).subscribe(result =>{
      this.onGetMovie();
    });
  }


  // Update an Actor
  onSelectUpdate(item) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }

  onUpdateActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.updateActor(this.actorId, obj).subscribe(result => {
      this.onGetActors();
    });
  }

  //Delete Actor
  onDeleteActor(item) {
    this.dbService.deleteActor(item._id).subscribe(result => {
      this.onGetActors();
    });
  }

  onDeleteMovie(item){
    this.dbService.deleteMovie(item._id).subscribe(result =>{
      this.onGetMovie();
    });
  }

  //Delete movies before year GOT PROBLEM
  onDeleteBeforeYear(){
    this.dbService.deleteBefore(this.beYear).subscribe(result => {
      this.onGetMovie()
    })
  }

  onSelectedActor(item){
    this.actorId = item._id;
  }

  onSelectedMovie(movies){
    let obj = this.actorId;
    this.dbService.insertActor(movies._id, obj).subscribe(result => {
      this.onGetMovie()
    })
  }

  // This lifecycle callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {
    this.onGetActors();
    this.onGetMovie();
  }

  changeSection(sectionId) {
    this.section = sectionId;
    this.resetValues();
  }

  resetValues() {
    this.fullName = "";
    this.bYear = 0;
    this.actorId = "";
  }
}
