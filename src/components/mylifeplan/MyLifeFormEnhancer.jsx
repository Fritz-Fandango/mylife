import { withFormik } from 'formik';
import * as Yup from 'yup';

// Luhn checksum: catches mistyped digits and most adjacent-digit swaps.
const passesLuhn = (digits) => {
  let sum = 0;
  let double = false;
  for (let i = digits.length - 1; i >= 0; i -= 1) {
    let n = Number(digits[i]);
    if (double) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    double = !double;
  }
  return sum % 10 === 0;
};

const MyLifeFormEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    // Card numbers are 13-19 digits; spaces and dashes are ignored.
    CCNumber: Yup.string()
      .transform((value) => (value ? value.replace(/[\s-]/g, "") : value))
      .required('CC number is required.')
      .matches(/^\d{13,19}$/, 'Invalid CC number entered. Please recheck.')
      .test(
        'luhn',
        'Invalid CC number entered. Please recheck.',
        (value) => !value || !/^\d{13,19}$/.test(value) || passesLuhn(value),
      ),
    // Entered as MM/YY (matches the field placeholder); must not be expired.
    expDate: Yup.string()
      .required('Expiration date is required.')
      .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Valid expiration date is needed')
      .test('not-expired', 'Card has expired.', (value) => {
        if (!value || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) return true;
        const [month, year] = value.split('/').map(Number);
        // A card is valid through the last day of its expiration month.
        const endOfMonth = new Date(2000 + year, month, 1);
        return endOfMonth > new Date();
      }),
    CVC: Yup.string()
      .required('CVC number is required.')
      .matches(/^\d{3,4}$/, 'Invalid CVC number entered. Please recheck.'),
  }),

  mapPropsToValues: ({ user }) => ({
    CCNumber: "",
    expDate: "",
    CVC: "",
    ...user,
  }),
  handleSubmit: (payload, { setSubmitting }) => {
    // alert(payload.email);
    setSubmitting(false);
  },
  displayName: 'MyForm',
});

export default MyLifeFormEnhancer;
