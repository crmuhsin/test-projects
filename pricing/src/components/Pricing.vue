<template>
<div class="container">
	<div class="row mt-3">
		<div class="col-8">
			<table class="table table-bordered table-striped table-sm text-center ">
				<thead>
					<tr style="height:50px;">
						<th>#</th>
						<th>Name</th>
						<th>Price</th>
						<th>Price (with VAT)</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, index) in filteredPriceData" :key="index">
						<td>{{ index+1 }}</td>
						<td>{{ item.name }}</td>
						<td>{{ item.price }}</td>
						<td>{{ Math.ceil(item.price*1.15) }}</td>
					</tr>
					<tr class="bg-dark text-white">
						<td colspan="2">Total Price</td>
						<td>{{totalPrice}}</td>
						<td>{{totalPricewithVat}}</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="col-4">
			<button @click="filterPrice" class="btn btn-block btn-sm btn-primary mb-1">Filter Price(if above 50 taka)</button>
			<br>
			<button @click="reset" class="btn btn-block btn-sm btn-success mb-1">Reset</button>
			<br>
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
			priceData: [],
			filteredPriceData: [],
			totalPrice: 0,
			totalPricewithVat:0
		};
	},
	mounted(){
		this.getPriceData();
	},
	methods: {
		async getPriceData(){
			let result = await axios.get("http://test-schema.herokuapp.com/vegetables")
			try {
				this.priceData = result.data.data;
				this.filteredPriceData = this.priceData;
			} catch (error) {
				console.log(error);
			}
		},
		filterPrice(){
			this.filteredPriceData = this.priceData.filter(item=>Math.ceil(item.price*1.15)>50)
		},
		reset(){
			this.filteredPriceData = this.priceData;
		},
	},
	watch:{
		filteredPriceData(){
			this.totalPrice = this.filteredPriceData.reduce((sum, current) => sum + current.price, 0)
			this.totalPricewithVat = this.filteredPriceData.reduce((sum, current) => sum + Math.ceil(current.price*1.15), 0)
		}
	}
};
</script>

<style scoped>
</style>