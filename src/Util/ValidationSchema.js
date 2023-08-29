import { boolean, object, string, ref, number } from 'yup';
export const loginSchema = object({
	email: string().email().required('Please Enter Your Email Address.'),
	password: string().min(6).required('Password Can not be Empty'),
	remember: boolean(),
});
export const emailSchema = object({
	email: string().email().required('Please Enter Your Email Address.'),
});
export const changePassword = object({
	newPassword: string()
		.min(8)
		.max(16)
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?=.{8,16}).*$/,
			'required A-Z, a-z, 0-9, special character',
		)
		.required('Password Can not be Empty'),
	confirmPassword: string()
		.oneOf([ref('newPassword'), null], 'Passwords must match')
		.required('Password Can not be Empty'),
});

export const signupSchema = object({
	fullName: string().required(),
	email: string().email().required('Please Enter Your Email Address.'),
	phone: string().min(6, 'Invalid Phone Number').max(20).required(),
	password: string()
		.min(8)
		.max(16)
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?=.{8,16}).*$/,
			'required A-Z, a-z, 0-9, special character',
		)
		.required('Password Can not be Empty'),
});

export const profileSchema = object({
	currentPassword: string().min(6),
	newPassword: string().min(6),
	confirmPassword: string().oneOf(
		[ref('newPassword'), null],
		'Passwords must match',
	),
});

export const categorySchema = object({
	name: string().required(),
	slug: string()
		.matches(/^[A-Za-z]+$/, 'Avoid space.')
		.required(),
});

export const subCategorySchema = object({
	name: string().required(),
	slug: string()
		.matches(/^[A-Za-z]+$/, 'Avoid space.')
		.required(),
});

export const productSchema = object({
	name: string().required(),
	description: string().required(),
	price: string()
		.matches(/^\d+(\.\d+)?$/, 'Not valid')
		.required(),
	tax: string()
		.matches(/^\d+(\.\d+)?$/, 'Not valid')
		.required(),
	fee: string()
		.matches(/^\d+(\.\d+)?$/, 'Not valid')
		.required(),
	quantity: string()
		.matches(/^\d+(\.\d+)?$/, 'Not valid')
		.required(),
	origin: string().required(),
	link: string().required(),
	tags: string().required(),
});

export const checkoutSchema = object({
	email: string().email().required('Please Enter Your Email Address.'),
	phone: string().min(10, 'Invalid Phone Number').max(17).required(),
	altPhone: string().min(10, 'Invalid Phone Number').max(17),
	firstName: string().required('First Name Required'),
	lastName: string().required('Last Name Required'),
	address: string().required(),
	city: string().required(),
	area: string().required(),
	zip: string().required(),
	instruction: string(),
});


// Request Items

export const requestItems = object({
	name: string(),
	quantity: number(),
	email: string().email().required('Please Enter Your Email Address.'),
	phone:'',
	link: string().required(),
	note: string(),
	sellerTakes: number().required(),
	tax: number().required(),
	fee: number().required(),
	shippingaddress:string(),
	billingaddress: string(),
})