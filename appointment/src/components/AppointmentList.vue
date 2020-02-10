<template>
<div class="container">
    <div class="row mt-3">
      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Email address</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Appointment Date</th>
            <th>Appointment Time</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in showingAppointments" :key="index">
            <td>{{ item.firstname }}</td>
            <td>{{ item.lastname }}</td>
            <td>{{ item.age }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.phone }}</td>
            <td>{{ item.address }}</td>
            <td>{{ item.date }}</td>
            <td>{{ item.timeslot }}</td>
          </tr>
        </tbody>
      </table>
    </div>
	<div class="row mt-3">
		<div class="col">
			<nav class="float-right">
				<ul class="pagination">
					<li class="page-item">
						<select class="form-control" v-model="numberofItem" @change="pagination(1, numberofItem)">
							<option disabled>Number of Items</option> 
							<option :value="item" v-for="item in 10" :key="item">{{item}}</option>
						</select>
					</li>
					<li>...</li>
					<li class="page-item" v-for="item in Math.ceil(totalResults/numberofItem)" :key="item"><a class="page-link" @click="pagination(item, numberofItem)">{{item}}</a></li>
				</ul>
			</nav>
			<h6 class="float-left">Total Booking: {{totalResults}}
				<hr>
				Total Page: {{Math.ceil(totalResults/numberofItem)}}
			</h6>
		</div>
	</div>
</div>
</template>

<script>
export default {
	name: "AppointmentList",
	data(){
		return {
			appointmentList: [],
			totalResults: 0,
			numberofItem: 2,
			showingAppointments:[],
			currentPage:0
		}
	},
	mounted(){
		if(localStorage.appoinments){
			this.appointmentList = JSON.parse(localStorage.appoinments);
			this.totalResults = this.appointmentList.length;
			this.pagination(1, this.numberofItem);
		}
	},
	methods: {
		pagination(page, per_page) {
			let offset = (page - 1) * per_page
			this.showingAppointments = this.appointmentList.slice(offset).slice(0, per_page)
		}
		
	}
};
</script>

<style scoped>
</style>
