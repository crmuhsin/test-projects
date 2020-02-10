<template>
<div class="container">
	<div class="row mt-3">
		<div class="loader" v-if="loader"></div>
		<div class="col-12">
			<div class="row mb-4">
				<div class="col-8 col-md-7 offset-md-1">
					<input class="form-control mr-1 float-left" type="text" placeholder="Search Movie Title" v-model="keyword" @input="debounceSearch(1)">
				</div>
				<div class="col-4 col-md-4">
					<button class="btn btn-warning float-left" @click="search(1)">Search</button>
				</div>
			</div>
			<div class="row mb-4">
				<div class="col-12 text-center">
					<h6 v-if="totalResults>0">Total Result Found: {{totalResults}}</h6>
					<h6 v-else>No Result found for this search.</h6>
				</div>
			</div>
			<div class="row text-center">
				<div class="card-columns">
					<div class="card" v-for="(item, index) in movieList" :key="index">
						<h5 class="pt-4">{{item.Title}}</h5>
						<img class="card-img-top my-3" :src="item.Poster"  :alt="item.Title">
						<div class="card-body">
							<p class="card-text">{{'('+item.Year+')'}}</p>
						</div>
					</div>
				</div>
			</div>
			<div class="row" v-if="totalResults>0">
				<div class="col">
					<nav class="float-right">
						<ul class="pagination">
							<li class="page-item"><a class="page-link" @click="search(currentPage-1)" v-if="currentPage>1">Previous</a></li>
							<li class="page-item"><a class="page-link" @click="search(currentPage-1)" v-if="currentPage>1">{{currentPage-1}}</a></li>
							<li class="page-item"><a class="page-link" @click="search(currentPage)">{{currentPage}}</a></li>
							<li class="page-item"><a class="page-link" @click="search(currentPage+1)" v-if="currentPage<pageList.length">{{currentPage+1}}</a></li>
							<li class="page-item" v-if="currentPage!=pageList.length">...</li>
							<li class="page-item"><a class="page-link" @click="search(pageList.length)" v-if="currentPage!=pageList.length">{{pageList.length}}</a></li>
							<li class="page-item"><a class="page-link" @click="search(currentPage+1)" v-if="currentPage!=pageList.length">Next</a></li>
						</ul>
					</nav>
					<h6 class="float-left">Current Page: {{currentPage}}</h6>
				</div>
			</div>
		</div>
	</div>
</div>
</template>
<script>
import axios from "axios";

export default {
	name: "Pricing",
	data() {
		return {
			singleMovie:{},
			movieList: [],
			keyword: '',
			totalResults: 0,
			pageList:[],
			currentPage:1,
			debounce : null,
			loader: false
		};
	},
	methods: {
		async getSingleMovie(){
			let result = await axios.get("http://www.omdbapi.com/?apikey=6ca8451c&" + "i=tt3896198")
			try {
				this.singleMovie = result.data;
			} catch (error) {
				console.log(error);
			}
		},
		async search(page){
			this.currentPage = page;
			let result = await axios.get("http://www.omdbapi.com/?apikey=6ca8451c&s=" + this.keyword + "&page=" +page)
			try {
				this.movieList = result.data.Search;
				this.totalResults = result.data.totalResults;
				this.pageList = []
				for (let i = 0, count = 1; i < this.totalResults; i+=10, count++) {
					this.pageList.push(count)
				}
				this.loader = false;
			} catch (error) {
				console.log(error);
			}
		},
		debounceSearch(page){
			this.loader = true;
			clearTimeout(this.debounce)
			this.debounce = setTimeout(() => {
				this.search(page);
			}, 1000)
		}
	},
};
</script>

<style scoped>
.card-columns {
    column-count: 4;
}

@media (max-width: 768px) {
	.card-columns {
		column-count: 2;
	}
}
img{
	height: 300px;
	width: 100%;
}
.loader {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 1;
  width: 150px;
  height: 150px;
  margin: -75px 0 0 -75px;
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.page-item{
	cursor: pointer;
}
</style>