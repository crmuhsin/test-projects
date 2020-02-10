<template>
<div class="container">
	<div class="row">
		<div class="loader" v-if="loader"></div>
		<div class="col-12">
			<div class="text-center mb-4">
				<h1 class="mb-3">Book an Appointment</h1>
			</div>
			<div class="alert alert-danger" v-if="error">
				<span>{{error}}</span>
			</div>
		</div>
		<div class="col-12">
			<div class="row">
				<div class="col-12 col-md-6">
					<p class="form-label-group">
						<label>First Name</label>
						<input type="text" class="form-control form-control-sm" placeholder="Enter First Name" v-model="formData.firstname" autofocus autocomplete="off">
					</p>
					<p class="form-label-group">
						<label>Last Name</label>
						<input type="text" class="form-control form-control-sm" placeholder="Enter Last Name" v-model="formData.lastname" autofocus autocomplete="off">
					</p>
					<p class="form-label-group">
						<label>Age</label>
						<input type="number" class="form-control form-control-sm" placeholder="Enter Age" v-model="formData.age" autofocus autocomplete="off">
					</p>

				</div>
				<div class="col-12 col-md-6">
					<p class="form-label-group">
						<label>Email address</label>
						<input type="email" id="inputEmail" class="form-control form-control-sm" placeholder="Email address" v-model="formData.email" autofocus autocomplete="off">
					</p>
					<p class="form-label-group">
						<label>Phone Number</label>
						<input type="number" class="form-control form-control-sm" placeholder="Enter Phone Number" v-model="formData.phone" autofocus autocomplete="off">
					</p>
					<p class="form-label-group">
						<label>Address</label>
						<textarea class="form-control form-control-sm" placeholder="Enter Address" v-model="formData.address"  cols="30" rows="3"></textarea>
					</p>
				</div>
			</div>
			<hr>
			<div class="col-12 text-center">
				<div class="row">
					<div class="col-12 col-md-6">
						<p class="form-label-group">
							<label>Pick a Date</label>
							<input
							type="text"
							onfocus="(this.type='date')"
							onblur="(this.type='text')"
							v-model="formData.date"
							class="form-control form-control-sm"
							placeholder="Pick a Date"
							@change="timeSlotValidation(formData.date)"
							>
						</p>
					</div>
					<div class="col-12 col-md-6">
						<p class="form-label-group" v-if="availableTimeslot.length > 0">
							<label>Pick a Time Slot</label>
							<select v-model="formData.timeslot" class="form-control form-control-sm" >
								<option v-for="(item, index) in availableTimeslot" :key="index" :value="item.text">{{item.text}}</option>
							</select>
						</p>
						<p v-else>
							No timeslot available for this date. Choose another.
						</p>
					</div>
				</div>
				<button class="btn btn-primary" @click.prevent="bookingAppointment()">Book</button>
			</div>
		</div>
	</div>
</div>
</template>

<script>
export default {
	name: "Booking",
	data(){
		return {
			formData:{
				// firstname: "firstname",
				// lastname : "lastname",
				// email : "email@asd.asd",
				// phone : "12",
				// address : "address",
				// age : "12",
				// timeslot: '4:00-5:00'
			},
			timeSlots: [
				{ text:'4:00-5:00'},
				{ text:'5:00-6:00'},
				{ text:'6:00-7:00'},
			],
			availableTimeslot: [],
			error : "",
			loader:false,
			appointmentList: [],
		}
	},
	mounted(){
		if(localStorage.appoinments){
			this.appointmentList = JSON.parse(localStorage.appoinments);
		}
	},
	methods: {
		bookingAppointment(){
			this.loader = true;
			this.error = this.validator(this.formData);
			if (this.error === '') {
				this.appointmentList.push(this.formData);
				localStorage.appoinments = JSON.stringify(this.appointmentList);
				setTimeout( () => this.formData = {}, 1000);
				this.loader = false;
			} else {
				this.loader = false;
			}
		},
		timeSlotValidation(date){
			let bookedSlot = []
			this.appointmentList.forEach(item=>{
				if (item.date==date) {
					bookedSlot.push(item.timeslot);
				}
			});
			this.availableTimeslot = this.timeSlots.filter(item=> !bookedSlot.includes(item.text))
		},
		validator(formData){
			if (formData.firstname && formData.lastname && formData.email && formData.phone && formData.address && formData.age && formData.date && formData.timeslot) {
				if (formData.firstname.length < 3) {
					return 'firstname must be at least 3 characters.';
				}
				if (formData.lastname.length < 3) {
					return 'lastname must be at least 3 characters.';
				}
				let re = /\S+@\S+\.\S+/;
				if (!re.test(formData.email)) {
					return 'Invalid Email';
				}
				return '';
			}
			else if (!formData.firstname) {
				return 'firstname required.';
			}
			else if (!formData.lastname) {
				return 'lastname required.';
			}
			else if (!formData.email) {
				return 'email required.';
			}
			else if (!formData.phone) {
				return 'phone number required.';
			}
			else if (!formData.address) {
				return 'address required.';
			}
			else if (!formData.age) {
				return 'age required.';
			}
			else if (!formData.date) {
				return 'date required.';
			}
			else if (!formData.timeslot) {
				return 'timeslot required.';
			}
		},
	}
};
</script>

<style scoped>
body{
  font-size: 15px;
}
</style>
