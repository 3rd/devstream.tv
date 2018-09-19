<template>
  <div class="home page">
    <div class="hero">
      <h1 v-if="liveStreamCount > 0">
        Watch {{ liveStreamCount }} {{ liveStreamCount > 1 ? 'developers' : 'developer' }} streaming right now.
      </h1>
      <h1 v-else>
        :(
        <br>
        There's no developer streaming right now.
      </h1>
      <p class="notice">
        <b>Note:</b> Devstream needs your help.
        This is a community-powered website, the streamers and videos we list are coming from a
        <a href="https://github.com/neculaesei/devstream.tv">public GitHub repository</a>.
        You can contribute to the project by creating a pull request on the repo.
      </p>
    </div>
    <div class="streams">
      <mu-container class="filtered-tags-wrapper">
        <mu-chip class="filtered-tags" v-for="tag, index in sortTags" :key="tag" :color="'success'" @delete="removeTag(index)" delete>{{tag}}</mu-chip>
      </mu-container>
      <mu-flex
        class="flex-wrapper stream"
        justify-content="center"
        align-items="start"
        v-for="(stream, streamIndex) in streams"
        :key="`stream-${streamIndex}`"
      >
        <div class="left">
          <iframe
            :src="`https://player.twitch.tv/?channel=${stream.twitch}&autoplay=false`"
            frameborder="false" allowfullscreen="allowfullscreen"></iframe>
        </div>
        <div class="right">
          <div class="name">
            {{ stream.stream.name }} -
            <a :href="`https://twitch.tv/${stream.twitch}`">https://twitch.tv/{{stream.twitch}}</a>
          </div>
          <div class="title">
            {{ stream.stream.title }}
          </div>
          <ul class="tags">
            <li v-for="(tag, tagIndex) in stream.tags" :key="`tags-${streamIndex}-${tagIndex}`" @click="addTagToFilter(tag)">
              {{ tag }}
            </li>
          </ul>
          <div class="viewers">
            <eye-icon></eye-icon>
            <span>
              {{ stream.stream.viewers }} viewers
            </span>
          </div>
          <div class="links">
            <li
              v-for="(link, linkIndex) in !stream.viewAllLinks ? getTopLinks(stream.links) : stream.links"
              :key="`links-${streamIndex}-${linkIndex}`"
            >
              <component v-bind:is="getLinkIcon(link.key)"></component>
              <a
                class="link"
                :class="{ ['link-' + link.key.toLowerCase()]: true }"
                :href="link.url">
                {{ link.key }} - {{ link.url }}
              </a>
            </li>
            <li
              class="view-more"
              @click="toggleLinks(stream)"
              v-if="!stream.viewAllLinks && stream.links.length > maxLinks"
            >
              {{
                stream.links.length - maxLinks > 1 ?
                  `View ${stream.links.length - maxLinks } more links`
                  :
                  'View one more link'
              }}
            </li>
          </div>
        </div>
      </mu-flex>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// import { setInterval } from 'timers'

import {
  EyeIcon,
  Link2Icon,
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
  FacebookIcon,
  GlobeIcon,
  PlayCircleIcon,
  InstagramIcon
} from 'vue-feather-icons'

export default {
  name: 'Home',
  components: {
    EyeIcon
  },
  data () {
    return {
      allStreams: [],
      streams: [],
      maxLinks: 3,
      sortTags: []
    }
  },
  watch: {
    sortTags: function (tags) {
      if (tags.length <= 0) {
        this.streams = this.allStreams
        return
      }

      this.streams = this.allStreams.filter(stream => {
        let status = false

        for (let tag of tags) {
          if (!stream.tags.includes(tag)) {
            status = false
            break
          }

          status = true
        }

        if (status) { return stream }
      })
    }
  },
  computed: {
    liveStreamCount () {
      return this.streams.length
    }
  },
  methods: {
    addTagToFilter (tag) {
      if (this.sortTags.includes(tag)) { return false }
      this.sortTags = [...this.sortTags, tag]
    },
    removeTag (index) {
      this.sortTags.splice(index, 1)
    },
    transformStreams (streams) {
      return streams.map(stream => {
        let oldStream = this.streams.find(e => e.twitch === stream.twitch)
        stream.viewAllLinks = oldStream
          ? oldStream.viewAllLinks
          : false
        let links = Object.keys(stream.links).map(linkKey => {
          return {
            key: linkKey,
            url: stream.links[linkKey]
          }
        })
        stream.links = links
        return stream
      })
    },
    toggleLinks (stream) {
      stream.viewAllLinks = true
    },
    loadStreams () {
      axios.get(this.$endpoints.liveStreams).then(response => {
        this.allStreams = this.streams = this.transformStreams(response.data)
      })
    },
    getLinkIcon (key) {
      switch (key.toLowerCase()) {
        case 'github':
          return GithubIcon
        case 'linkedin':
          return LinkedinIcon
        case 'twitter':
          return TwitterIcon
        case 'youtube':
          return YoutubeIcon
        case 'facebook':
          return FacebookIcon
        case 'website':
          return GlobeIcon
        case 'twitch':
          return PlayCircleIcon
        case 'instagram':
          return InstagramIcon
        default:
          return Link2Icon
      }
    },
    getTopLinks (links) {
      return links.slice(0, this.maxLinks)
    }
  },
  mounted () {
    this.loadStreams()
  }
}
</script>

<style lang="scss" scoped>
.hero {
  text-align: center;
  padding: 100px 20px 30px;

  h1 {
    font-weight: 300;
    font-size: 32px;
    line-height: 44px;
    color: #4B67FA;
    margin-bottom: 30px;
  }

  .notice {
    max-width: 600px;
    margin: auto;
    text-align: left;
    background: #efefef;
    color: #9e9e9e;
    padding: 10px;
    border-radius: 8px;
  }
}

.filtered-tags-wrapper {
  text-align: center;
  margin-bottom: 30px;
    .filtered-tags {
      margin: 8px;
      vertical-align: middle;
    }
}

.stream {
  max-width: 1000px;
  margin: auto;
  margin-bottom: 40px;

  .left {
    padding-right: 50px;
    width: 50%;
  }
  .right {
    padding: 10px 0;
    width: 50%;
  }

  iframe {
    padding: 10px;
    background: #FAFAFA;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.34);
    border-radius: 4px;
    width: 100%;
    height: 262px;
  }

  .name, .name a {
    color: #989898;
    font-size: 12px;
    margin-bottom: 14px;
  }
  .name a:hover {
    text-decoration: underline;
  }
  .title {
    color: #1E3AD0;
    font-size: 20px;
    line-height: 24px;
    margin-bottom: 14px;
  }
  .tags {
    list-style: none;
    padding: 0;
    margin: 0;
    color: #A3A3A3;
    margin-bottom: 14px;

    li {
      background: #EEEEEE;
      border-radius: 4px;
      display: inline-block;
      padding: 4px 6px;
      font-size: 12px;
      margin-right: 8px;
      margin-bottom: 8px;

      &:last-child {
        margin-right: 0;
      }
      &:hover {
          background-color: #2196f3;
          color: #FFF;
          cursor: pointer;
      }
    }
  }
  .viewers {
    font-size: 12px;
    color: #989898;
    margin-bottom: 14px;
    line-height: 12px;

    span, svg {
      display: inline-block;
      vertical-align: middle;
    }

    svg {
      height: 14px;
      width: 22px;
    }
  }
  .links {
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      margin: 0;
      padding: 0;
    }
    svg {
      width: 20px;
      stroke: #989898;
      margin-right: 6px;
    }
    a, svg {
      display: inline-block;
      vertical-align: middle;
    }
    a {
      color: #989898;
      font-size: 12px;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    .view-more {
      color: #989898;
      font-size: 12px;
      text-decoration: underline;
      cursor: pointer;
      margin-top: 4px;
    }
  }
}

@media all and (max-width: 600px) {
  .hero {
    padding: 40px 20px;
  }
  .stream {
    display: block !important;

    .left, .right {
      width: 100%;
    }

    .left {
      margin-bottom: 10px;
      padding: 0;
    }
  }
}
</style>
