# Make School Coding Challenge - Resume-o-tron

Wow! We're so happy you want to work at Make School! 🙌 However we want to review
your skills to understand your level of expertise and whether you're a good fit for our team. Technically. You're already awesome.

We are looking for people that ❤️ GraphQL and are feeling right at home mutating and querying
against GraphQL APIs.

For this reason we've come up with the **Resume-o-tron** challenge. Your task is to make a GraphQL API and populate it with your own resume. I know, rite? This is your time to shine, you can populate the CV with anything you want. The prettier the resume and your understanding of pleasing UIs, the better!

The first thing for you to do is to make the actual API, so here's some starter info: [GraphQL SDL](https://www.prisma.io/blog/graphql-sdl-schema-definition-language-6755bcb9ce51).

```graphql
type Position {
  position: String!
  description: String!
  year: Int!
}

type Resume {
  # Add things like name, age, address, maybe a photo?
  # Up to you to decide.

  position: [Position]
}
```

After you've build and published your API, it's time to build the client for it. Your client should at the least do the following two things:

- Show your filled in resume.
- Make it possible to add positions via a simple edit form.

The API client can be build in React and consume your own API. You can choose your own GraphQL API client and any frameworks you'd like but you should be able to tell us why you chose it. And have actual experience using the competitors in order to make an informed decision.

## The FAQ.

### But I can't make API's! That's backend! 

It could be, but it doesn't have to be. This challenge tests your wit and your coding skills. If you're looking for a hint. Its already in this tutorial! 

### Who will rate me?

Emile & Alena will rate you. Emile checks on what you delivered and Alena will check how you delivered it. She's all into quality, Emile is more into seeing "how lazy you are kinda thing" and how much you can deliver in a short timespan and your street-smartness.

### How will I be rated?

You'll be rated on your code quality and your commit style. The tools you use. How you write CSS, how you write React. Less is more. Refactorability === Life. The runnability and installability of your code and if you can explain the WHY behind your choices. The way you raise a PR, the way you describe your code etc.

### How long should this take me?

It should take about 2 hours. If it takes longer it doesn't mean you're bad, it might just mean that you not have taken all possible options into account. So plan ahead.

### How do I give my solution to Makeschool?

Its super easy! Just raise a pullrequest against master and we'll get a notification and we'll contact you!

Aditionally, please answer the following questions in your pull request:

1. I chose this package manager because ... [insert-awesomeness-here]
2. I chose this graphql client because ... [insert-new-hotness-here]
3. I'm especially proud of ... [insert-super-thing-here]
4. I think this challenge is a ... [rating-out-of-5]
5. If there was one thing i could improve about GraphQL it would be ... [earth-shattering-feature]

Ready? Awesome! Lets get going! Hope to see you soon at Make School! Emile & Alena!
