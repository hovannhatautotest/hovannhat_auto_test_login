/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
describe('Verify validation text', () => {
    beforeEach(()=>{
      cy.visit('http://duv23hk3u3y8m.cloudfront.net/en/auth/login')
      cy.xpath('/html/body/div[1]/div/div/div[2]/div[4]/label/div').click()
      cy.xpath('/html/body/div[2]/div/div/div[2]/div[1]/div/div/div[1]/div').click()
    })
    
    it('Verify that validation text of "Username" field display when logging in with "Username" field empty', () => {
      cy.get('#password').type('text_pass')
      cy.get('#idSubmit').click()
      cy.wait(2000)
      cy.get('#email_help > .ant-form-item-explain-error').should('have.text','Please enter username')
    })
    
    it('Verify that validation text of "Password" field display when logging in with "Password" field empty', () => {
      cy.get('#email').type('text_user@gmail.com')
      cy.get('#idSubmit').click()
      cy.wait(2000)
      cy.get('#password_help > .ant-form-item-explain-error').should('have.text','Please enter password')
    })
    
    it('Verify that validation text of "Username" field and "Password" field display when logging in with "Username" field and "Password" empty', () => {
      cy.get('#idSubmit').click()
      cy.wait(2000)
      cy.get('#email_help > .ant-form-item-explain-error').should('have.text','Please enter username')
      cy.get('#password_help > .ant-form-item-explain-error').should('have.text','Please enter password')
    })
    
    it('Verify that validation text of "Username" field display when logging in with "Username" field invalid email format.', () => {
      cy.get('#email').type('text_user')
      cy.get('#password').type('text_pass')
      cy.get('#idSubmit').click()
      cy.wait(2000)
      cy.get('#email_help > .ant-form-item-explain-error').should('have.text','Please enter a valid email address!')
    })

    it('Verify that the authentication text of the "Username" field is displayed when logging in with a username that is less than 6 characters long.', () => {
      cy.get('#email').type('text')
      cy.get('#password').type('text_pass')
      cy.get('#idSubmit').click()
      cy.wait(2000)
      cy.get('#email_help > :nth-child(1)').should('have.text','Please enter a valid email address!')
      cy.get('#email_help > :nth-child(2)').should('have.text','Please enter at least 6 characters!')
    })
})
  
describe('Verify error message', () => {
  beforeEach(()=>{
    cy.visit('http://duv23hk3u3y8m.cloudfront.net/en/auth/login')
    cy.xpath('/html/body/div[1]/div/div/div[2]/div[4]/label/div').click()
    cy.xpath('/html/body/div[2]/div/div/div[2]/div[1]/div/div/div[1]/div').click()
  })
    
  it('Verify that error message display when logging in with "Username" field invalid and "Password" valid', () => {
    const username = "text_user@gmail.com"
    const password = "Password1!"
    const error_message = 'User' + ' ' + username + ' not found!'
    cy.get('#email').type(username)
    cy.get('#password').type(password)
    cy.get('#idSubmit').click()
    cy.wait(2000)
    cy.get('#swal2-title').should('have.text','Fail')
    cy.xpath('/html/body/div[3]/div/div[2]').should('have.text',error_message)
  })
  
  it('Verify that error message display when logging in with "Username" field invalid and "Password" valid', () => {
    const username = "admin@admin.com"
    const password = "text_pass"
    const error_message = 'Invalid credentials for user' + ' ' + username
    cy.get('#email').type(username)
    cy.get('#password').type(password)
    cy.get('#idSubmit').click()
    cy.wait(2000)
    cy.get('#swal2-title').should('have.text','Fail')
    cy.xpath('/html/body/div[3]/div/div[2]').should('have.text',error_message)
  })

  it('Verify that error message display when logging in with "Username" field invalid and "Password" invalid', () => {
    const username = "text_user@gmail.com"
    const password = "text_pass"
    const error_message = 'User' + ' ' + username + ' not found!'
    cy.get('#email').type(username)
    cy.get('#password').type(password)
    cy.get('#idSubmit').click()
    cy.wait(2000)
    cy.get('#swal2-title').should('have.text','Fail')
    cy.xpath('/html/body/div[3]/div/div[2]').should('have.text',error_message)
  })

  it('Verify that the error message displays when logging with a password less than 6 characters.', () => {
    const username = "text_user@gmail.com"
    const password = "text"
    const error_message = 'password must be longer than or equal to 6 characters'
    cy.get('#email').type(username)
    cy.get('#password').type(password)
    cy.get('#idSubmit').click()
    cy.wait(2000)
    cy.get('#swal2-title').should('have.text','Fail')
    cy.xpath('/html/body/div[3]/div/div[2]').should('have.text',error_message)
  })
})
  
describe('Verify Sign in successfuly', () => {    
  beforeEach(()=>{
    cy.visit('http://duv23hk3u3y8m.cloudfront.net/en/auth/login')
    cy.xpath('/html/body/div[1]/div/div/div[2]/div[4]/label/div').click()
    cy.xpath('/html/body/div[2]/div/div/div[2]/div[1]/div/div/div[1]/div').click()
  })
    
  it('Verify that Login is successful with administrator account', () => {
    const username = "admin@admin.com"
    const password = "Password1!"
    const Notification = "Success"
    cy.get('#email').type(username)
    cy.get('#password').type(password)
    cy.get('#idSubmit').click()
    cy.wait(2000)
    cy.get('#swal2-title').should('have.text',Notification)
    cy.xpath('/html/body/div[3]/div/div[2]').should('have.text',Notification)
    cy.wait(2000)
    cy.xpath('/html/body/div[1]/main/div[2]').should('have.text','Admin')
    cy.wait(2000)
    cy.xpath('/html/body/div/main/div[2]/div[2]').click() 
    cy.wait(2000)
    cy.xpath('/html/body/div/main/div[3]/ul/li[1]/div').should('have.text','User')
    cy.xpath('/html/body/div[1]/main/div[3]/ul/li[2]/div/div/div[1]').should('have.text','Day Off')
    cy.xpath('/html/body/div[1]/main/div[3]/ul/li[3]/div/div/div').should('have.text','Setting')
  })

  it('Verify that Login is successful with Manager account', () => {
    const username = "manager@gmail.com"
    const password = "Nhat@01101999"
    const Notification = "Success"
    cy.get('#email').type(username)
    cy.get('#password').type(password)
    cy.get('#idSubmit').click()
    cy.wait(2000)
    cy.get('#swal2-title').should('have.text',Notification)
    cy.xpath('/html/body/div[3]/div/div[2]').should('have.text',Notification)
    cy.wait(2000)
    cy.xpath('/html/body/div[1]/main/div[2]').should('have.text','Admin')
    cy.wait(2000)
    cy.xpath('/html/body/div/main/div[2]/div[2]').click() 
    cy.wait(2000)
    cy.xpath('/html/body/div/main/div[3]/ul/li[1]/div').should('have.text','User')
    cy.xpath('/html/body/div[1]/main/div[3]/ul/li[2]/div/div/div[1]').should('have.text','Day Off')
    cy.xpath('/html/body/div[1]/main/div[3]/ul/li[3]/div/div/div').should('have.text','Setting')
  })

  it('Verify that Login is successful with Staff account', () => {
    const username = "staff@gmail.com"
    const password = "Nhat@01101999"
    const Notification = "Success"
    cy.get('#email').type(username)
    cy.get('#password').type(password)
    cy.get('#idSubmit').click()
    cy.wait(2000)
    cy.get('#swal2-title').should('have.text',Notification)
    cy.xpath('/html/body/div[3]/div/div[2]').should('have.text',Notification)
    cy.wait(2000)
    cy.xpath('/html/body/div[1]/main/div[2]').should('have.text','Admin')
    cy.wait(2000)
    cy.get('.hamburger').click()
    cy.wait(2000)
    cy.xpath("//span[text()='Day Off']").eq(1).should('have.text','Day Off')
    cy.xpath("//span[text()='Setting']").should('have.text','Setting')
    cy.wait(2000)
  })
})
  
describe('Verify navigate to Forgot password page', () => {    
  beforeEach(()=>{
    cy.visit('http://duv23hk3u3y8m.cloudfront.net/en/auth/login')
    cy.xpath('/html/body/div[1]/div/div/div[2]/div[4]/label/div').click()
    cy.xpath('/html/body/div[2]/div/div/div[2]/div[1]/div/div/div[1]/div').click()
  })
    
  it('Verify that CAN navigate to the "Forgot Password" page from the link on the Log In page', () => {
    cy.get('.text-blue-600').click()
    cy.wait(2000)
    cy.xpath("//h3[text()='Forgot Password']").should('have.text','Forgot Password')
  })

  it('Verify that validation text of "Email" field display when Forgot Password with "Email" field empty', () => {
    cy.get('.text-blue-600').click()
    cy.wait(2000)
    cy.xpath("//button[text()='Send']").click()
    cy.wait(2000)
    cy.get('.ant-form-item-explain-error').should('have.text','Please enter email')
  })

  it('Verify that validation text of "Email" field display when Forgot Password with "Email" field invalid email format and less than 6 characters.', () => {
    const email = "text"
    cy.get('.text-blue-600').click()
    cy.wait(2000)
    cy.xpath("//input[@placeholder='Enter email']").type(email)
    cy.xpath("//button[text()='Send']").click()
    cy.wait(2000)
    cy.get('#email_help > :nth-child(1)').should('have.text','Please enter a valid email address!')
    cy.get('#email_help > :nth-child(2)').should('have.text','Please enter at least 6 characters!')
  })

  it('Verify that validation text of "Email" field display when Forgot Password with "Email" field invalid email format and greater than 6 characters.', () => {
    const email = "text_user"
    cy.get('.text-blue-600').click()
    cy.wait(2000)
    cy.xpath("//input[@placeholder='Enter email']").type(email)
    cy.xpath("//button[text()='Send']").click()
    cy.wait(2000)
    cy.get('.ant-form-item-explain-error').should('have.text','Please enter a valid email address!')
  })

  it('Verify that the forgot password can be cancel using the "Cancel" button', () => {
    const email = "text_user"
    cy.get('.text-blue-600').click()
    cy.wait(2000)
    cy.xpath("//input[@placeholder='Enter email']").type(email)
    cy.xpath("//button[text()='Cancel']").click()
    cy.xpath("//h2[@class='-intro-x font-bold text-3xl text-white mb-3']").should('have.text','Welcome to Web Member Ari')
    cy.xpath('//h1').should('have.text','Sign In')
  })
})
  
describe('Verify displays the password', () => {
  beforeEach(()=>{
    cy.visit('http://duv23hk3u3y8m.cloudfront.net/en/auth/login')
    cy.xpath('/html/body/div[1]/div/div/div[2]/div[4]/label/div').click()
    cy.xpath('/html/body/div[2]/div/div/div[2]/div[1]/div/div/div[1]/div').click()
  })
    
  it('Verify that the password can be displayed in text format when clicking on the "Eye" icon.', () => {
    const username = "text_user@gmail.com"
    const password = "text_password"
    cy.get('#email').type(username)
    cy.get('#password').type(password)
    cy.wait(2000)
    cy.get('#password').invoke('attr', 'type', 'text')
  })
})
  
describe('Verify refresh page', () => {
    beforeEach(()=>{
    cy.visit('http://duv23hk3u3y8m.cloudfront.net/en/auth/login')
    cy.xpath('/html/body/div[1]/div/div/div[2]/div[4]/label/div').click()
    cy.xpath('/html/body/div[2]/div/div/div[2]/div[1]/div/div/div[1]/div').click()
  })
    it('Verify entered data not showing when Refresh button is clicked', () => {
      cy.get('#email').type('text_user@gmail.com')
      cy.get('#password').type('text_password')
      cy.reload()
      cy.get('#email').should("be.empty")
      cy.get('#password').should("be.empty")
    })
})
