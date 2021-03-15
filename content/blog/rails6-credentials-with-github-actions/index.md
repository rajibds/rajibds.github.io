---
title: Rails master key within Github actions
date: "2021-03-12T22:12:03.284Z"
description: "Welcome to my very first post!"
---

Rails 6 introduced a very nice concept of master key, which enables us to push credentials in the form of encrypted files in source control.

Now while integrating Github actions for the specs, or, linters in our code, we might come across pieces of codes where we need to decrypt the credentials.

Decrypting credentials need the master key, which, we, of course, do not push in our source control.

An example of the above scenario can be depicted as:

```ruby
# sign_up_controller.rb
class SignUpController < ApplicationController
  def index
    ...
    SignUpMailer.notify(email: email, otp: otp).deliver_now
  end

# sign_up_mailer.rb
class SignUpMailer < ApplicationMailer
  def notify(email:, otp:)
    mail(to: email, subject: 'Please verify your email')
  end
end

#application_mailer.rb
class ApplicationMailer < ActionMailer::Base
  default from: Rails.application.credentials.dig(:gmail, :user_name)
  layout 'mailer'
end

# now the spec
# sign_up_controller_spec.rb
RSpec.describe SignUpController, type: :controller do
  describe 'GET #index' do
    it 'sends a verification e-mail' do
      get :index
      ...
    end
  end
end
```

If we have Github actions configured, we will have the following error if we run the above spec
>SMTP From address may not be blank: nil

The reason is Github actions can not decrypt the `user_name` key in `gmail` hash here, as it does not have the master key:
```ruby
Rails.application.credentials.dig(:gmail, :user_name)
```

To solve this error, we need to add this key as **Repository Secrets** in Github settings, which can be found at project settings > secrets.

After adding the master key to Github secrets, the above specs run smoothly.
