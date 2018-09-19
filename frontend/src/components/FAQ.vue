<template>
  <div class="faq page">
    <div class="content">
        <h1 class="title">FAQ</h1>
        <div class="faq">
            <div class="question">
                Can I submit a new stream?
            </div>
            <div class="answer">
              Yes, please. Use the <a href="/submit-content">config generator</a> and create a
              <a href="https://github.com/neculaesei/devstream.tv">pull request on GitHub</a>.
            </div>
            <div class="question">
              How do I modify / remove a stream?
            </div>
            <div class="answer">
              Each stream gets its own file in our repo and its path should be something like <code>streams/${twitchHandle}.json</code>.
              <br>
              All you have to do is change that file and submit a pull request.
            </div>
            <div class="question">
                I have an idea / I found an issue!
            </div>
            <div class="answer">
              That's great! If you found an issue or have an idea you think might improve devstream please create
              an issue on <a href="https://github.com/neculaesei/devstream.tv/issues">GitHub</a>.
            </div>
            <div class="question">
                How can I get in touch with you?
            </div>
            <div class="answer">
               If you have ideas to discuss / need to reach out for some other reason,
               <a href="https://andreineculaesei.com/contact">fill this form</a>.
            </div>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
.faq {
  .question {
    font-size: 22px;
    margin-bottom: 10px;
    margin-top: 40px;

    &:first-child {
      margin-top: 0;
    }
  }
  .answer {
    font-size: 16px;
    line-height: 22px;
  }
  code {
    color: red;
    font-size: 14px;
  }
}

@media all and (max-width: 600px) {
  .faq .question {
    text-align: center;
  }
}
</style>
