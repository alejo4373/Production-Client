import { AuthContainer } from './AuthContainer'
import { Route } from 'react-router-dom'
import { render, screen, waitFor } from '@testing-library/react'
import LoginForm from '../../components/Auth/LoginForm'
import ReCAPTCHA from 'react-google-recaptcha'
import React from 'react'
import SignupForm from '../../components/Auth/SignupForm'
import userEvent from '@testing-library/user-event'

/* Component Mocks */
jest.mock('react-router-dom', () => ({
  Route: jest.fn(() => null),
  Switch: jest.fn(({ children }) => children)
}))

jest.mock('react-google-recaptcha', () => jest.fn(() => null))
jest.mock('../../components/Auth/LoginForm', () => jest.fn(() => null))
jest.mock('../../components/Auth/SignupForm', () => jest.fn(() => null))

const setup = propsOverrides => {
  const props = {
    signupUser: jest.fn(),
    loginUser: jest.fn(),
    auth: {},
    location: {},
    history: {
      replace: jest.fn()
    }
  }
  return render(<AuthContainer {...props} {...propsOverrides} />)
}

beforeEach(() => {
  jest.clearAllMocks()
})

describe('<AuthContainer />', () => {
  it('Renders two routes. One for log-in and another for sign-up', () => {
    setup()
    const [Route1Props, Route2Props] = Route.mock.calls
    expect(Route1Props[0].path).toBe('/login')
    expect(Route2Props[0].path).toBe('/signup')

    // Because the value returned by the render prop is not invoked by react here
    // I can't do expect(LoginForm).toHaveBeenCalled() directly, however i can
    // expect that if the render prop was to be called by react  it would be called
    // with the correct component
    const Route1Component = Route1Props[0].render().type
    expect(Route1Component).toBe(LoginForm)

    const Route2Component = Route2Props[0].render().type
    expect(Route2Component).toBe(SignupForm)
  })

  describe('Renders a reCAPTCHA', () => {
    it('Renders reCAPTCHA checkbox with onChange and onErrored props', () => {
      setup()
      expect(screen.getByTestId('recaptcha-wrapper')).toBeInTheDocument()
      expect(ReCAPTCHA).toHaveBeenCalledWith(
        expect.objectContaining({
          onChange: expect.any(Function),
          onErrored: expect.any(Function)
        }),
        expect.objectContaining({})
      )
    })

    it('reCAPTCHA handleCaptcha prop set error message if not called with a token', async () => {
      setup()
      const [props] = ReCAPTCHA.mock.calls[0]
      props.onChange('')
      await waitFor(() => {
        expect(
          screen.getByText(
            'Human verification expired, please indicate you are not a robot again'
          )
        ).toBeInTheDocument()
      })
    })

    it('reCAPTCHA onErrored prop sets error message if an error occurred', async () => {
      setup()
      const [props] = ReCAPTCHA.mock.calls[0]
      props.onErrored('')
      await waitFor(() => {
        expect(
          screen.getByText(
            'There was an error. Please check your network and try again later'
          )
        ).toBeInTheDocument()
      })
    })
  })

  it('Renders a warning if user landed /auth from a being redirected from a protected route', () => {
    setup({ location: { state: { referrer: '/todos' } } })
    expect(screen.getByText('You need to log in to go there')).toBeInTheDocument()
  })

  it('Displays error message is user tries to authenticate without passing the reCAPTCHA', async () => {
    const loginUser = jest.fn()
    setup({ loginUser, location: { pathname: '/login' } })

    const submitBtn = screen.getByRole('button', '')
    userEvent.click(submitBtn)

    await waitFor(() => {
      expect(loginUser).not.toHaveBeenCalled()
      expect(
        screen.getByText('Please verify that you are not a robot and try again.')
      ).toBeInTheDocument()
    })
  })

  it("Submits Log-In form if form is 'login' and captcha is resolved", async () => {
    const loginUser = jest.fn()
    setup({ loginUser, location: { pathname: '/login' } })

    // Simulate passing reCAPTCHA
    const [ReCaptchaProps] = ReCAPTCHA.mock.calls[0]
    ReCaptchaProps.onChange('a-dummy-recaptcha-token')

    const submitBtn = screen.getByRole('button', '')
    userEvent.click(submitBtn)

    await waitFor(() => {
      expect(loginUser).toHaveBeenCalled()
    })
  })

  it("Submits Sign-Up form if form is 'login' and captcha is resolved", async () => {
    const signupUser = jest.fn()
    setup({ signupUser, location: { pathname: '/signup' } })

    // Simulate passing reCAPTCHA
    const [ReCaptchaProps] = ReCAPTCHA.mock.calls[0]
    ReCaptchaProps.onChange('a-dummy-recaptcha-token')

    const submitBtn = screen.getByRole('button', '')
    userEvent.click(submitBtn)

    await waitFor(() => {
      expect(signupUser).toHaveBeenCalled()
    })
  })

  it('Displays error from the server when auth fails', async () => {
    const { rerender } = setup()

    rerender(
      <AuthContainer
        auth={{
          error: 'Username not available. Please try a different one.'
        }}
        location={{}}
      />
    )

    await waitFor(() => {
      expect(
        screen.getByText('Username not available. Please try a different one.')
      ).toBeInTheDocument()
    })
  })

  it("Redirects user to referrer if they're logged in", () => {
    const replace = jest.fn()
    setup({
      auth: { loggedIn: true },
      history: { replace },
      location: { state: { referrer: '/todos' } }
    })
    expect(replace).toHaveBeenCalledWith('/todos')
  })
})
