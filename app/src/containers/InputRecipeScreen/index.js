import React, { Fragment, PropTypes } from 'react';
import {
	ScrollView,
	TouchableOpacity,
	Text,
	Image,
	View,
	TextInput,
	Platform,
} from 'react-native';
import styles from './styles';
import { Container, Header, Left, Body, Title, Right, Button, Picker, Form } from "native-base";
import { Icon } from 'react-native-elements'
import * as navigation from '../../utils/navigation'
import ImagePicker from 'react-native-image-picker'
import { Formik } from 'formik'
import * as yup from 'yup'
import ModalSelector from 'react-native-modal-selector'
import { recipeCategory, recipeLevel } from '../../utils/global-constant'
import { getAccessToken } from '../../utils/request'
import { apiUrl } from '../../utils/global-constant'
import { loadRecipe, loadMyRecipe } from '../HomeScreen/actions'



const data = recipeLevel.map((item, index) => ({ key: index, label: item }))
const categoryData = recipeCategory.map((item, index) => ({ key: index, label: item.name }))


export default class InputRecipeScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			photo: null,
			ingredients: [],
			steps: [],
			level: data[0].label,
			category: categoryData[0].label,
		}
		this.handleChoosePhoto = this.handleChoosePhoto.bind(this);
		this.handleAddIngredient = this.handleAddIngredient.bind(this);
		this.handleAddStep = this.handleAddStep.bind(this);
		this.updateLevel = this.updateLevel.bind(this);
		this.updateCategory = this.updateCategory.bind(this);
		this.createFormData = this.createFormData.bind(this);
		this.uploadRecipe = this.uploadRecipe.bind(this);
		this.removeIngredient = this.removeIngredient.bind(this);
		this.removeStep = this.removeStep.bind(this);
	}

	handleAddIngredient(amount, unit, ingredient) {
		const newIngredient = {
			"name": ingredient,
			"amount": amount,
			"unit": unit,
		}
		newIngre = [newIngredient]
		this.setState((state) => ({ ingredients: state.ingredients.concat(newIngre) }))
	}

	handleAddStep(step) {
		const newStep = {
			"instruction": step
		}
		stepEle = [newStep]
		this.setState((state) => ({ steps: state.steps.concat(stepEle) }))
	}

	handleChoosePhoto = (values) => {
		const options = {
			noData: true,
		}
		ImagePicker.launchImageLibrary(options, response => {
			if (response.uri) {
				this.setState({ photo: response })
			}
		})
	}

	updateLevel(level) {
		this.setState({ level: level })
	}

	updateCategory(category) {
		this.setState({ category: category })
	}

	removeIngredient(index) {
		var arr = this.state.ingredients
		arr.splice(index, 1)
		this.setState({ ingredients: arr })
	}

	removeStep(index) {
		var arr = this.state.steps
		arr.splice(index, 1)
		this.setState({ steps: arr })
	}

	createFormData(values) {
		const { photo, level, category, ingredients, steps } = this.state;
		const data = new FormData();

		data.append("image", {
			name: photo.fileName,
			type: photo.type,
			uri:
				Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
		});

		data.append("totalTime", values.time);
		data.append("name", values.name);
		data.append("portion", (values.portion).toString());
		data.append("description", level);
		data.append("category", category);
		data.append("steps", JSON.stringify(steps));
		data.append("ingredients", JSON.stringify(ingredients));
		return data;
	};

	uploadRecipe(values) {
		newData = this.createFormData(values);
		console.log(newData)
		fetch(apiUrl + "/recipe/addRecipe" + '?time=' + new Date(), {
			method: "POST",
			body: newData,
			headers: {
				'Authorization': getAccessToken(),
			}
		})
			.then(response => response.json())
			.then(response => {
				console.log("upload succes", response);
				alert("Upload success!");
				values.name = "";
				values.time = "";
				values.portion = "";
				this.setState({ ingredients: [] });
				this.setState({ steps: [] });
				this.setState({ level: data[0].label });
				this.setState({ category: categoryData[0].label })
				this.setState({	photo: null })
				this.props.dispatch(loadRecipe())
				this.props.dispatch(loadMyRecipe())
			})
			.catch(error => {
				console.log("upload error", error);
				alert("Upload failed!");
			});
	}



	render() {
		const { photo, ingredients, steps, level, category } = this.state
		return (
			<Container style={{ backgroundColor: '#F4F4F4' }}>
				<Formik initialValues={{ name: "", time: "", portion: "" }}
					validationSchema={
						yup.object().shape({
							name: yup
								.string()
								.required("Name is required"),
							time: yup
								.string()
								.required("Time is required"),
							portion: yup
								.number()
								.required("Portion is required"),
						})}
					onSubmit={(values) => {
						if (this.state.photo == null) {
							alert("Please choose a photo")
						}
						else if (this.state.ingredients.length == 0) {
							alert("Please add an ingredient")
						}
						else if (this.state.steps.length == 0) {
							alert("Please add a step")
						}
						else
							this.uploadRecipe(values);
					}}
				>
					{({ values, handleChange, errors, touched, handleSubmit }) =>
						(
							<Fragment>
								<Header style={{ borderBottomWidth: 0, marginTop: 10, backgroundColor: '#F4F4F4' }}>
									<Left>
										<Button
											transparent
											onPress={() => this.props.navigation.goBack()}>
											<Icon name="arrow-back" color='#000' size={32} type="material" />
										</Button>
									</Left>
									<Body>
										<Title style={styles.title}>ADD RECIPE</Title>
									</Body>
									<Right>
										<TouchableOpacity onPress={handleSubmit}>
											<Text style={styles.up}>UPLOAD</Text>
										</TouchableOpacity>
									</Right>
								</Header>
								<ScrollView contentContainerStyle={styles.body}
									showsVerticalScrollIndicator={false}>
									<View style={styles.intro}>
										<View style={styles.rowName}>
											<Text style={styles.txtIntro}>Recipe of: </Text>
											<TextInput style={styles.inputIntro} placeholder='Ex: Stawberry cupcake' onChangeText={handleChange("name")} value={values.name} />
										</View>
										{touched.name && errors.name &&
											<Text style={{ fontSize: 12, color: 'red', width: '100%', padding: 2 }}>{errors.name}</Text>
										}
										<View style={styles.rowName}>
											<Text style={styles.txtIntro}>Time: </Text>
											<TextInput style={styles.inputIntro} placeholder='Ex: 15 mins' onChangeText={handleChange("time")} value={values.time} />
										</View>
										{touched.time && errors.time &&
											<Text style={{ fontSize: 12, color: 'red', width: '100%', padding: 2 }}>{errors.time}</Text>
										}
										<View style={styles.rowName}>
											<Text style={styles.txtIntro}>Portion: </Text>
											<TextInput style={styles.inputIntro} placeholder='Ex: 4' keyboardType='numeric' onChangeText={handleChange("portion")} value={values.portion} />
										</View>
										{touched.portion && errors.portion &&
											<Text style={{ fontSize: 12, color: 'red', width: '100%', padding: 2 }}>{errors.portion}</Text>
										}
										<View style={styles.rowName}>
											<Text style={styles.txtIntro}>Level: </Text>
											<ModalSelector
												data={data}
												initValue={level}
												onChange={(option) => { this.updateLevel(option.label) }}></ModalSelector>
										</View>
										<View style={styles.rowName}>
											<Text style={styles.txtIntro}>Category: </Text>
											<ModalSelector
												data={categoryData}
												initValue={category}
												onChange={(option) => { this.updateCategory(option.label) }}></ModalSelector>
										</View>
									</View>
									<TouchableOpacity style={styles.frame} onPress={() => this.handleChoosePhoto()}>
										<Text style={styles.text}>Upload Image</Text>
										{photo && (
											<Image
												source={{ uri: photo.uri }}
												style={styles.img} />
										)
										}
									</TouchableOpacity>
									{touched.photo && errors.photo &&
										<Text style={{ fontSize: 12, color: 'red', width: '100%', padding: 2 }}>{errors.photo}</Text>
									}
									<View style={styles.ingredient}>
										<Text style={styles.step}>INGREDIENTS</Text>
										{
											ingredients.map((ingredient, index) => (
												<View style={styles.rowflex1} key={index}>
													<View style={styles.smallBtn} />
													<Text style={styles.txt}>{`${ingredient.amount} ${ingredient.unit} ${ingredient.name}`}</Text>
													<TouchableOpacity style={styles.removeBtn} onPress={() => this.removeIngredient(index)}><Text style={styles.plus}>-</Text></TouchableOpacity>
												</View>
											))
										}
										<View style={styles.inputIngre}>
											<Formik initialValues={{ ingredient: '', amount: '', unit: '' }}
												validationSchema={
													yup.object().shape({
														ingredient: yup
															.string()
															.required("Ingredient is required"),
														unit: yup
															.string()
															.required("Unit is required"),
														amount: yup
															.string()
															.required("Amount is required"),

													})}
												onSubmit={(values) => {
													this.handleAddIngredient(values.amount, values.unit, values.ingredient);
													values.ingredient = "";
													values.unit = "";
													values.amount = "";
												}}
											>
												{({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) =>
													(
														<Fragment>
															<View style={styles.rowIngredient}>
																<View style={styles.rowIngre}>
																	<TextInput style={styles.row}
																		placeholder='Ingredient'
																		value={values.ingredient}
																		onBlur={() => setFieldTouched('ingredient')}
																		onChangeText={handleChange('ingredient')}></TextInput>
																	{touched.ingredient && errors.ingredient &&
																		<Text style={{ fontSize: 12, color: 'red', width: '100%', padding: 2 }}>{errors.ingredient}</Text>
																	}
																</View>
																<View style={styles.rowAmount}>
																	<TextInput style={styles.row}
																		placeholder='Amount'
																		value={values.amount}
																		keyboardType='numeric'
																		onBlur={() => setFieldTouched('amount')}
																		onChangeText={handleChange('amount')} />
																	{touched.amount && errors.amount &&
																		<Text style={{ fontSize: 12, color: 'red', width: '100%', padding: 2 }}>{errors.amount}</Text>
																	}
																</View>
																<View style={styles.rowUnit}>
																	<TextInput style={styles.row}
																		placeholder='Unit'
																		value={values.unit}
																		onBlur={() => setFieldTouched('unit')}
																		onChangeText={handleChange('unit')} />
																	{touched.unit && errors.unit &&
																		<Text style={{ fontSize: 12, color: 'red', width: '100%', padding: 2 }}>{errors.unit}</Text>
																	}
																</View>
															</View>
															<TouchableOpacity style={styles.addCart} onPress={handleSubmit}>
																<Text style={styles.addTxt}>ADD INGREDIENT</Text>
															</TouchableOpacity>
														</Fragment>
													)
												}
											</Formik>
										</View>
									</View>
									<View style={styles.steps}>
										<Text style={styles.step}>INSTRUCTIONS</Text>
										{
											steps.map((step, index) => (
												<View style={styles.rowflex2} key={index}>
													<View style={styles.largeBtn}>
														<Text style={styles.index}>{index}</Text>
													</View>
													<Text style={styles.txt}>{step.instruction}</Text>
													<TouchableOpacity style={styles.removeBtn2} onPress={() => this.removeStep(index)}><Text style={styles.plus}>-</Text></TouchableOpacity>
												</View>
											))
										}
										<View style={styles.inputStep}>
											<Formik initialValues={{ step: "" }}
												validationSchema={
													yup.object().shape({
														step: yup
															.string()
															.required("Step is required"),

													})}
												onSubmit={(values) => {
													this.handleAddStep(values.step);
													values.step = "";
												}}
											>
												{({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) =>
													(
														<Fragment>
															<TextInput style={styles.inputStp}
																placeholder='Step'
																value={values.step}
																onBlur={() => setFieldTouched('step')}
																onChangeText={handleChange('step')} />
															{touched.step && errors.step &&
																<Text style={{ fontSize: 12, color: 'red', width: '100%', padding: 2 }}>{errors.step}</Text>
															}
															<TouchableOpacity style={styles.addCart} onPress={handleSubmit}>
																<Text style={styles.addTxt}>ADD INSTRUCTION</Text>
															</TouchableOpacity>
														</Fragment>
													)
												}
											</Formik>
										</View>
									</View>
								</ScrollView>
							</Fragment>
						)
					}
				</Formik>
			</Container>
		)
	}
}
