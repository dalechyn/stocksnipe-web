export const passValidate = {
	minLengthCheck: pass => pass.length >= 8 || 'Minimum password length is 8 symbols',
	maxLengthCheck: pass => pass.length <= 32 || 'Maximum password length is 32 symbols',
	lowerCaseLetterCheck: pass =>
		pass.split('').some(c => c >= 'a' && c <= 'z') || 'One small letter is required',
	upperCaseLetterCheck: pass =>
		pass.split('').some(c => c >= 'A' && c <= 'Z') || 'One big letter is required',
	digitCheck: pass =>
		pass.split('').some(c => c >= '0' && c <= '9') || 'One digit is required'
}
