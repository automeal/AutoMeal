import React from 'react'
import PropTypes from 'prop-types'

export default class ProfileForm extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			Email: this.props.values.Email || 'Your personal email address',
			DietRestrictions: this.props.values.DietRestrictions || 'Your diet restrictions',
			SavedItems: this.props.values.SavedItems || 'Your saved items',
			LikedRecipes: this.props.values.LikedRecipes || 'Your liked recipes'
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSumbit = this.handleSumbit.bind(this)
	}
	handleChange (event){
		event.preventDefault();
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	handleSumbit (event){
		event.preventDefault();
	}

	render () {
		return (
			<form onSubmit={this.handleSumbit}>
			<label htmlFor='Email'>
				Email
			</label>
			<input type='text' value={this.state.Email} onChange={this.handleChange} name='Email' />
			<label htmlFor='DietRestrictions'>
				Diet restrictions
			</label>
			<textarea value={this.state.DietRestrictions} onChange={this.handleChange} name='DietRestrictions' />
			<label htmlFor='SavedItems'>
				Saved items
			</label>	
			<textarea value={this.state.SavedItems} onChange={this.handleChange} name='SavedItems' />
			<label htmlFor='LikedRecipes'>
				Liked recipes
			</label>
			<textarea value={this.state.LikedRecipes} onChange={this.handleChange} name='LikedRecipes' />
			<button className='cta-primary' type='submit'>
				Save Change
			</button>
			</form>			
			)
	}
}
ProfileForm.propTypes = {
	values: PropTypes.shape({
		Email: PropTypes.string,
		DietRestrictions: PropTypes.string,
		SavedItems: PropTypes.string,
		LikedRecipes: PropTypes.string


	}).isRequired
}


