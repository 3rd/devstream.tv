<template>
  <div class="submit page">
    <div class="content">
      <h1 class="title">Submit content</h1>
      <div class="submit-content">
        <div class="info">
          <p>
            All the streams you see on Devstream are community-curated and come from a 
            <a href="https://github.com/neculaesei/devstream.tv">public GitHub repository</a>.
          </p>
          <p>
            People add content by forking it and creating pull requests on the main repo.
          </p>
          <p>
            To make submissions easier I made the generator below, so you don't have to write the entries manually or worry about the format.
          </p>
        </div>
        <div class="form">
          <!-- <div class="label">
            What kind of content would you like to submit?
          </div>
          <div class="field">
            <mu-flex class="select-control-row">
              <mu-radio class="radio" value="stream" v-model="type"  label="Stream (Twitch.tv)"></mu-radio>
              <mu-radio class="radio" value="video" v-model="type"  label="Video (YouTube)"></mu-radio>
            </mu-flex>
          </div> -->

          <mu-paper :z-depth="3" class="form-group">
            <mu-flex
              class="flex-wrapper"
              justify-content="center"
              align-items="start"
            >
              <mu-form ref="streamform" v-if="type === 'stream'" :model="stream" label-position="top" label-width="200">
                <mu-form-item prop="name" help-text="Example: Jane Doe" label="Streamer name" :rules="rules.name">
                  <mu-text-field v-model="stream.name"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="twitch" label="Twitch handle" help-text="Example: 5upercircuits" :rules="rules.handle">
                  <mu-text-field v-model="stream.twitch"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="tags" label="Stream tags" help-text="To create a new tag write it and press Enter."
                  :rules="rules.tags"
                >
                  <mu-select v-model="stream.tags" chips multiple tags>
                    <template slot="selection" slot-scope="scope">
                      <mu-chip :selected="scope.selected" color="teal">
                        {{scope.label}}
                      </mu-chip>
                    </template>
                    <mu-option
                      v-for="tag in usedTags"
                      :key="tag"
                      :label="tag"
                      :value="tag">
                    </mu-option>
                  </mu-select>
                </mu-form-item>
                <mu-form-item class="links-wizard" prop="links" label="Stream links" :rules="rules.links">
                  <div class="note">
                    Note: You can add other links (with other keys) by changing the JSON manually.
                  </div>
                  <div class="stream-link" v-for="(link,index) in stream.links" :key="`stream-link-${index}`">
                    <mu-select class="name" v-model="link.name" tags>
                      <template slot="selection" slot-scope="scope">
                        <mu-chip :selected="scope.selected" color="teal">
                          {{scope.label}}
                        </mu-chip>
                      </template>
                      <mu-option
                        v-for="name in linkNames"
                        :key="name"
                        :label="name"
                        :value="name">
                      </mu-option>
                    </mu-select>
                    <mu-text-field v-model="link.url" help-text="Example: https://github.com/neculaesei"></mu-text-field>
                  </div>
                  <mu-button @click="addLink" class="add-link" small round color="primary">Add another link</mu-button>
                </mu-form-item>
              </mu-form>
            </mu-flex>
            <mu-flex class="actions" justify-content="center" align-items="center">
              <!-- <mu-button color="success" @click="submit">Submit content</mu-button> -->
              <mu-button color="success" @click="getConfig">Get config</mu-button>
            </mu-flex>
          </mu-paper>
        </div>
      </div>
    </div>
    <mu-dialog
      :title="type === 'stream' ? 'Stream config' : 'Video config'"
      width="600" max-width="80%" :esc-press-close="true" :overlay-close="true"
      :open.sync="configDialogVisible"
      class="modal"
    >
      <div class="config-info" v-if="type === 'stream'">
        Create a new file called <pre>{{ stream.twitch.toLowerCase() }}.json</pre> in
        <a href="https://github.com/neculaesei/devstream.tv/blob/master/streams">/streams</a> with the content below.
      </div>
      <div class="config-info" v-if="type === 'video'">
        Create a new file called <pre>{{ stream.twitch.toLowerCase() }}.json</pre> in
        <a href="https://github.com/neculaesei/devstream.tv/blob/master/videos">/videos</a> with the content below.
      </div>
      <textarea class="code" v-model="currentConfig" spellcheck="false"></textarea>
      <mu-alert class="alert" color="success" @delete="showCopyAlert = false" delete v-if="showCopyAlert" transition="mu-scale-transition">
        <mu-icon left value="check_circle"></mu-icon>  The config has been copied successfully to your clipboard.
      </mu-alert>
      <mu-button slot="actions" color="primary" @click="copyConfig">Copy to clipboard</mu-button>
      <mu-button slot="actions" flat color="primary" @click="closeConfigDialog">Close</mu-button>
    </mu-dialog>
  </div>
</template>

<script>

const axios = require('axios')

export default {
  name: 'SubmitContent',
  data () {
    return {
      type: 'stream',
      streams: [],
      stream: {
        name: '',
        twitch: '',
        tags: [],
        links: [{
          name: 'GitHub',
          url: ''
        }]
      },
      video: {

      },
      configDialogVisible: false,
      showCopyAlert: false
    }
  },
  computed: {
    usedTags () {
      let tags = new Set()
      this.streams.forEach(stream => {
        stream.tags.forEach(tag => {
          tags.add(tag)
        })
      })
      return [...tags]
    },
    linkNames () {
      return [
        'GitHub',
        'Website',
        'Twitch',
        'YouTube',
        'Twitter',
        'LinkedIn',
        'Facebook',
        'Instagram'
      ].filter(name => {
        return this.stream.links.find(link => link.name === name) === undefined
      })
    },
    currentStreamConfig () {
      let out = JSON.parse(JSON.stringify(this.stream))
      let mappedLinks = {}
      out.links.filter(link => link.name.length && link.url.length).forEach(link => {
        mappedLinks[link.name] = link.url
      })
      out.links = mappedLinks
      return JSON.stringify(out, null, 2)
    },
    currentVideoConfig () {
      return 'video'
    },
    currentConfig: {
      get () {
        if (this.type === 'stream') {
          return this.currentStreamConfig
        } else {
          return this.currentVideoConfig
        }
      },
      set (value) {}
    },
    rules () {
      return {
        name: [
          {
            validate: (val) => {
              return !!val
            },
            message: 'Name cannot be empty.'
          }
        ],
        handle: [
          {
            validate: (val) => {
              return !!val
            },
            message: 'Handle cannot be empty.'
          },
          {
            validate: (val) => {
              return !/\s/.test(val)
            },
            message: 'Handle cannot contain whitespaces.'
          }
        ],
        tags: [

        ],
        links: [

        ]
      }
    }
  },
  methods: {
    addLink () {
      this.stream.links.push({
        name: '',
        url: ''
      })
    },
    submit () {
      return ''
    },
    getConfig () {
      if (this.type === 'stream') {
        this.$refs.streamform.validate().then((valid) => {
          if (valid) {
            this.configDialogVisible = true
          }
        })
      }
      if (this.type === 'video') {
        this.$refs.streamform.validate().then((valid) => {
          if (valid) {
            this.configDialogVisible = true
          }
        })
      }
    },
    closeConfigDialog () {
      this.configDialogVisible = false
      this.showCopyAlert = false
    },
    copyConfig () {
      this.$copyText(this.currentConfig)
      this.showCopyAlert = true
    }
  },
  mounted () {
    axios.get(this.$endpoints.streams).then(response => {
      this.streams = response.data
    })
  }
}
</script>

<style lang="scss" scoped>
.submit-content {
  .info {
    font-size: 16px;
    line-height: 24px;
  }

  .field {
    .radio {
      margin-right: 20px;
    }
  }

  .label {
    font-size: 18px;
    margin-bottom: 10px;
    margin-top: 40px;
  }

  .form {
    margin-top: 40px;
  }

  .form-group {
    margin-top: 40px;
    padding: 20px 30px;
  }
  .stream-link {
    margin-bottom: 30px;
  }
  .add-link {
    margin-top: 0px;
  }
  .actions {
    button:not(:last-child) {
      margin-right: 10px;
    }
  }
}
.code {
  white-space: pre-wrap;
  border: 1px solid #ccc;
  width: 100%;
  max-width: 100%;
  display: block;
  padding: 10px 20px;
  min-height: 200px;
  font-family: 'Roboto Mono';
  font-size: 12px;
}

.note {
  margin-bottom: 10px;
}

.alert {
  margin-top: 20px;
}
.config-info {
  margin-bottom: 20px;

  pre {
    display: inline;
    color: red;
    font-size: 14px;
  }
}
</style>
