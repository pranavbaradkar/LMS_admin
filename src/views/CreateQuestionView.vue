<template>
  <v-container fluid class="pa-8">
    <v-dialog v-model="uploadingDialog" max-width="366px" persistent>
        <v-card>
          <v-container fluid class="pa-8">
            <v-card-text class="text-center">  
              <v-icon v-if="uploadingMsg != 'File Uploading...' " color="success" size="96"
                >mdi-check-circle-outline</v-icon
              >           
              <p  class="text-h5 py-4">{{ uploadingMsg }}</p> 
              <v-progress-circular
      :size="50"
      color="primary"
      indeterminate
      v-if="uploadingMsg == 'File Uploading...' "
    ></v-progress-circular>          
              <v-btn
                class="primary"
                large
                width="157px"
                rounded
                @click="uploadingDialog = false"              
                v-if="uploadingMsg != 'File Uploading...' "
                >OK</v-btn
              >
            </v-card-text>
          </v-container>
        </v-card>
      </v-dialog>
    <div v-if="createQuestionDialog">
      <v-card class="secondary" :height="getHeight + 'px'" elevation="0">
        <v-card-title class="pt-0">
          <v-toolbar elevation="0" class="secondary">
            <v-toolbar-title class="text-h5"
              >{{ formbtn() }} Question</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-row align="center" justify="end">
              <v-btn text @click="() => {this.$router.replace('/question-bank')}">Cancel</v-btn>
              <v-progress-circular
                v-if="isCreatingQuestion"
                indeterminate
                color="primary"
              ></v-progress-circular>

              <v-btn
                v-else
                rounded
                x-large
                class="primary"
                @click="!formbtnBool ? createQuestion() : updateInput(editId)"
              >
                <v-icon>mdi-book-open-variant</v-icon>{{ formbtn() }}
              </v-btn>
            </v-row>
          </v-toolbar>
        </v-card-title>
        <v-card height="88vh" id="myScroll">
          <v-form ref="form" lazy-validation>
            <v-card-text>
              <v-card class="ma-4 pa-4" elevation="0">
                <!-- Select Question Type -->
                <v-row class="d-flex align-center">
                  <v-col class="py-0" cols="3">
                    <div class="text-body-1 my-2"> <v-checkbox v-model="is_psychometric" label="Is Psychometric"></v-checkbox></div>
                  </v-col>
                  <v-col class="py-0" cols="3" v-if="is_psychometric">
                    <v-text-field
                      label="Set Number"
                      outlined
                      v-model="set_number"
                      :rules="[(v) => (!!v && is_psychometric) || 'Please enter the set number']"
                      type="number"
                      hide-details="auto"
                    ></v-text-field>
                  </v-col>
                  <v-col class="py-0" cols="6">
                    <div class="text-body-1 my-2">Question Type*</div>
                    <v-select
                      :disabled="is_psychometric"
                      v-model="questionType"
                      label="Choose Question Type"
                      :items="questionTypeList"
                      outlined
                      class="rounded-xl"
                      :rules="[(v) => !!v || 'Please select question type']"
                      required
                    >
                    </v-select>
                  </v-col>
                </v-row>
              
                <v-row>
                  <v-col class="py-0">
                    <v-row align="center" class="d-flex flex-row justify-space-between">
                
                        <div class="text-body-1 my-2">Question*</div>
                      <div class="d-flex flex-row align-center">
                       
                      <a v-if="questionAssetUrl" :href="questionAssetUrl" target="_blank" class="font-weight-bold me-5 text-uppercase">Attached File</a>
                      <v-btn text class="float-right my-2"
                          >
                          
                          <v-icon>mdi-attachment</v-icon> 
                          <span v-if="selectedFile != null
                          ">{{selectedFile.name}}</span>
                          <span v-else >Attach
                          Audio/Video/Image</span>
                          <input
                              type="file"
                              name="image"
                              @change="onChange"
                              accept="image/*, audio/*, video/*"
                          />
                        </v-btn>
                      </div>
                    </v-row>
                    <!-- <v-textarea
                      outlined
                      class="rounded-xl"
                      label="Enter Question"
                      v-model="questionName"
                      required
                      :rules="[v => !!v || 'Question is required']"
                    >
                    </v-textarea> -->
                    <ckeditor
                      :config="editorConfig"
                      v-model="questionName"
                      class="m-ckeditor"
                      :rules="[(v) => !!v || 'Question is required']"
                      required
                    >
                    </ckeditor>
                    
                  </v-col>
                </v-row>
                <!-- Single Select Answers -->
                <v-row v-if="questionType == 'SINGLE_CHOICE'">
                  <v-col>
                    <div class="text-body-1 mb-2">
                      Options*
                      <span class="font-italic grey--text"
                        >(Guidelines for image in options: 1. File type -
                        .jpeg/.jpg, .png, .bmp 2. File size - 5MB)
                      </span>
                    </div>
                    <v-radio-group
                      v-model="singleSelectCorrectAnswer"
                      :rules="[(v) => (!!v || is_psychometric) || 'Please select one']"
                    >
                      <v-list-item
                        :class="
                          singleSelectCorrectAnswer == option.option_key
                            ? 'green lighten-4 rounded-xl my-2'
                            : 'secondary rounded-xl my-2'
                        "
                        min-height="72"
                        v-for="(option, index) in options"
                        :key="index"
                      >
                        <v-list-item-avatar  v-if="!is_psychometric">
                          <v-radio :value="option.option_key"></v-radio>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-subtitle
                            v-if="option.option_type == 'IMAGE'"
                          >
                            <img
                              :src="option.option_value"
                              alt=""
                              width="auto"
                              height="50"
                              class="img"
                            />
                          </v-list-item-subtitle>
                          <v-list-item-title v-else class="align-center">
                            <div v-html="option.option_value"></div>
                          </v-list-item-title>

                          

                          <!-- <v-list-item-title >
                            <ckeditor                     
                              :config="editorConfig"
                              v-model="option.option_value"
                              class="m-ckeditor"
                              :rules="[(v) => !!v || 'Question is required']"
                              required
                            >
                            </ckeditor>
                          </v-list-item-title> -->
                        </v-list-item-content>
                        <v-list-item-content class="w-10 align-center" v-if="is_psychometric">
                          <v-text-field
                            label="Score"
                            outlined
                            v-model="option.score_value"
                            hide-details="auto"
                          ></v-text-field>
                        </v-list-item-content>
                        <v-list-item-action>
                          <v-row align="center">
                            <v-btn
                              v-if="option.option_type != 'IMAGE'"
                              icon
                              @click="editOption(index)"
                            >
                              <v-icon large class="pa-2"
                                >mdi-format-textbox
                              </v-icon>
                            </v-btn>
                            <v-btn icon color="blue" class="ml-4">
                              <v-icon>mdi-export-variant</v-icon>
                            </v-btn>
                            <v-btn
                              text
                              color="blue"
                              x-large
                              @click="editedOptionIndex = index"
                              v-on:click="uploadingForOption = true"
                              >Upload Image
                              <input
                                type="file"
                                name="image"
                                @change="onChange"
                                v-on:click="uploadingForOption = true"
                              />
                            </v-btn>
                            <v-btn icon @click="removeOption(index)">
                              <v-icon>mdi-delete </v-icon>
                            </v-btn>
                          </v-row>
                        </v-list-item-action>
                      </v-list-item>
                    </v-radio-group>
                  </v-col>
                </v-row>

                <!-- Multi Select Answers -->
                <v-row v-else-if="questionType == 'MULTIPLE_CHOICE'">
                  <v-col>
                    <div class="text-body-1 mb-2">
                      Options*
                      <span class="font-italic grey--text"
                        >(Guidelines for image in options: 1. File type -
                        .jpeg/.jpg, .png, .bmp 2. File size - 5MB)
                      </span>
                    </div>
                    <v-list-item
                      :class="
                        selectedAnswersForMultitpleTypeQuestions.includes(
                          option.option_key
                        )
                          ? 'green lighten-4 rounded-xl my-2'
                          : 'secondary rounded-xl my-2'
                      "
                      min-height="72"
                      v-for="(option, index) in options"
                      :key="index"
                    >
                      <v-list-item-avatar>
                        <v-checkbox
                          v-model="selectedAnswersForMultitpleTypeQuestions"
                          :value="option.option_key"
                        ></v-checkbox>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-subtitle
                          v-if="option.option_type == 'IMAGE'"
                        >
                          <img
                            :src="option.option_value"
                            alt=""
                            width="auto"
                            height="50"
                            class="img"
                          />
                        </v-list-item-subtitle>
                        <v-list-item-title v-else class="align-center">
                          <div v-html="option.option_value"></div>
                        </v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-row align="center">
                          <v-btn
                            v-if="option.option_type != 'IMAGE'"
                            icon
                            @click="editOption(index)"
                          >
                            <v-icon large class="pa-2"
                              >mdi-format-textbox
                            </v-icon>
                          </v-btn>
                          <v-btn icon color="blue" class="ml-4">
                            <v-icon>mdi-export-variant</v-icon>
                          </v-btn>
                          <v-btn
                            text
                            color="blue"
                            x-large
                            @click="editedOptionIndex = index"
                            v-on:click="uploadingForOption = true"
                            >Upload Image
                            <input
                              type="file"
                              name="image"
                              @change="onChange"
                            />
                          </v-btn>
                          <v-btn icon @click="removeOption(index)">
                            <v-icon>mdi-delete </v-icon>
                          </v-btn>
                        </v-row>
                      </v-list-item-action>
                    </v-list-item>
                  </v-col>
                </v-row>
                <v-row
                  v-if="
                    (questionType == 'SINGLE_CHOICE' ||
                    questionType == 'MULTIPLE_CHOICE')
                  "
                  justify="start"
                  align="center"
                  class="px-2 blue--text"
                  @click="addOption"
                >
                  <v-icon large>mdi-plus-circle-outline</v-icon>
                  <v-btn class="pl-0" text x-large color="blue"
                    >Add Options</v-btn
                  >
                </v-row>
                <v-row v-if="questionType == 'FILL_IN_THE_BLANKS'">
                  <v-col class="py-0">
                    <div class="text-body-1 my-2">Correct Answer*</div>
                    <v-textarea
                      :rules="[
                        (v) => !!v || 'Correct Answer field is required',
                      ]"
                      required
                      outlined
                      class="rounded-xl"
                      label="Enter Correct Answer"
                      v-model="correctAnswer"
                    >
                    </v-textarea>
                  </v-col>
                </v-row>
                <!-- True False -->
                <v-row v-if="questionType == 'TRUE_FALSE'">
                  <v-col>
                    <div class="text-body-1 mb-2">Options*</div>
                    <v-radio-group
                      v-model="trueFalseCorrectAnswer"
                      :rules="[(v) => !!v || 'Please select one']"
                    >
                      <v-list-item
                        :class="
                          trueFalseCorrectAnswer == option.title
                            ? 'green lighten-4 rounded-xl my-2'
                            : 'secondary rounded-xl my-2'
                        "
                        min-height="72"
                        v-for="(option, index) in [
                          { title: 'TRUE' },
                          { title: 'FALSE' },
                        ]"
                        :key="index"
                      >
                        <v-list-item-avatar>
                          <v-radio :value="option.title"></v-radio>
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <v-list-item-title>{{
                            option.title
                          }}</v-list-item-title>
                        </v-list-item-content>
                        <!-- <v-list-item-action>
                          <v-row align="center">
                            <v-btn icon>
                              <v-icon>mdi-dots-vertical </v-icon>
                            </v-btn>
                          </v-row>
                        </v-list-item-action> -->
                      </v-list-item>
                    </v-radio-group>
                  </v-col>
                </v-row>

                <!-- Match the Following -->

                <v-row v-if="questionType == 'MATCH_THE_FOLLOWING'">
                  <v-col>
                    <div class="text-body-1 mb-2">Options*</div>
                    <v-list-item
                      class="secondary rounded-xl my-2"
                      min-height="72"
                      v-for="(option, index) in options"
                      :key="index"
                    >
                      <v-list-item-content>
                        <v-list-item-title></v-list-item-title>
                        <v-list-item-subtitle
                          v-if="option.option_type == 'IMAGE'"
                        >
                          <img
                            :src="option.option_value"
                            alt=""
                            width="auto"
                            height="50"
                            class="img"
                          />
                        </v-list-item-subtitle>
                        <v-list-item-title v-else class="align-center">
                          <div v-html="option.option_value"></div>
                        </v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-row align="center">
                          <v-btn
                            v-if="option.option_type"
                            icon
                            @click="editOption(index)"
                          >
                            <v-icon large class="pa-2"
                              >mdi-format-textbox
                            </v-icon>
                          </v-btn>
                          <!-- <v-btn icon color="blue" class="ml-4">
                            <v-icon>mdi-export-variant</v-icon>
                          </v-btn> -->
                          <!-- <v-btn
                            text
                            color="blue"
                            x-large
                            @click="editedOptionIndex = index"
                            v-on:click="uploadingForOption = true"
                            >Upload Image
                            <input
                              type="file"
                              name="image"
                              @change="onChange"
                            />
                          </v-btn> -->
                          <!-- <v-btn icon>
                            <v-icon>mdi-dots-vertical </v-icon>
                          </v-btn> -->
                        </v-row>
                      </v-list-item-action>
                    </v-list-item>
                  </v-col>
                  <v-col>
                    <div class="text-body-1 mb-2">Correct Answer*</div>
                    <v-list-item
                      class="secondary rounded-xl my-2"
                      min-height="72"
                      v-for="(answer, index) in mtfAnswers"
                      :key="index"
                    >
                      <v-list-item-content>
                        <v-list-item-title class="align-center">
                          <div v-html="answer.answer_value"></div>
                        </v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-row align="center">
                          <v-btn
                            v-if="answer.answer_type != 'IMAGE'"
                            icon
                            @click="editAnswer(index)"
                          >
                            <v-icon large class="pa-2"
                              >mdi-format-textbox
                            </v-icon>
                          </v-btn>
                          <!-- <v-btn icon color="blue" class="ml-4">
                            <v-icon>mdi-export-variant</v-icon>
                          </v-btn> -->
                          <!-- <v-btn text color="blue" x-large>Upload Image</v-btn> -->
                          <!-- <v-btn icon>
                            <v-icon>mdi-dots-vertical </v-icon>
                          </v-btn> -->
                        </v-row>
                      </v-list-item-action>
                    </v-list-item>
                  </v-col>
                </v-row>
                <!-- Fill in the blanks -->
                <v-row v-if="questionType == 'Fill in the blanks'">
                  <v-col class="py-0">
                    <div class="text-body-1 my-2">Answer*</div>
                    <v-textarea
                      outlined
                      class="rounded-xl"
                      label="Enter Answer"
                    >
                    </v-textarea>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="py-0">
                    <div class="text-body-1 my-2">Answer Explanation*</div>
                    <v-textarea
                      :rules="[
                        (v) => !!v || 'Answer Explanation field is required',
                      ]"
                      required
                      outlined
                      class="rounded-xl"
                      label="Enter Answer Explanation"
                      v-model="answerExplanation"
                    >
                    </v-textarea>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="py-0">
                    <div class="text-body-1 my-2">Hint*</div>
                    <v-textarea
                      outlined
                      class="rounded-xl"
                      label="Enter Answer Hint"
                      :rules="[(v) => !!v || 'Answer Hint is required']"
                      required
                      v-model="hint"
                    >
                    </v-textarea>
                  </v-col>
                </v-row>
               
                <v-row>
                  <v-col class="py-0" cols="6">
                    <div class="text-body-1 my-2">
                      Score For Correct Answer*
                    </div>
                    <v-text-field
                      outlined
                      class="rounded-xl"
                      label="Correct Answer Score"
                      :rules="[
                        (v) => !!v || 'Correct Answer Score is required',
                      ]"
                      required
                      v-model="correctAnswerScore"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col class="py-0" cols="6">
                    <div class="text-body-1 my-2">
                      Estimated Time To Answer The Question*
                    </div>
                    <v-row>
                      <!-- <v-col cols="2">
                            <v-text-field
                              outlined
                              class="rounded-xl"
                              value="00"
                              label="Mins"
                              type="number"
                            >
                            </v-text-field>
                          </v-col> -->
                      <v-col cols="2">
                        <v-text-field
                          outlined
                          class="rounded-xl"
                          value="00"
                          label="Secs"
                          type="number"
                          :rules="[
                            (v) => !!v || 'Estimated Time field is required',
                          ]"
                          required
                          v-model="estimatedTime"
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>
              <v-card class="ma-4 pa-4" elevation="0">
                <v-row>
                  <v-col class="py-0">
                    <div class="text-body-1 my-2">Level</div>
                    <v-select
                      label="Choose Teaching Level"
                      :items="levels"
                      outlined
                      class="rounded-xl"
                      :rules="[
                        (v) => !!v || 'Teaching Level field is required',
                      ]"
                      v-model="level"
                      item-text="name"
                      item-value="id"
                      @change="dependApi()"
                    >
                    </v-select>
                  </v-col>
                  <v-col class="py-0">
                    <div class="text-body-1 my-2">Diffculty Level</div>
                    <v-select
                      label="Choose Difficulty Level"
                      :items="difficultyLevels"
                      outlined
                      class="rounded-xl"
                      :rules="[(v) => !!v || 'Difficulty Level is required']"
                      v-model="difficultyLevel"
                    >
                    </v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="py-0">
                    <div class="text-body-1 my-2">Complexity Level</div>
                    <v-select
                      label="Choose Complexity Level"
                      :items="complexityLevels"
                      outlined
                      class="rounded-xl"
                      v-model="complexityLevel"
                      :rules="[(v) => !!v || 'Complexity Level is required']"
                    >
                    </v-select>
                  </v-col>
                  <v-col class="py-0">
                    <div class="text-body-1 my-2">Knowledge Level</div>
                    <v-select
                      label="Choose Knowledge Level"
                      :items="knowledgeLevels"
                      outlined
                      class="rounded-xl"
                      v-model="knowledgeLevel"
                      :rules="[(v) => !!v || 'Knowledge Level is required']"
                    >
                    </v-select>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col class="py-0">
                    <div class="text-body-1 my-2">Bloom's Taxonomy Level</div>
                    <v-select
                      label="Choose Bloom's Taxonomy Level"
                      :items="bloomsTaxonomyLevel"
                      outlined
                      class="rounded-xl"
                      v-model="bloomsTaxonomy"
                      :rules="[
                        (v) => !!v || ' Blooms Taxonomy Level is required',
                      ]"
                    >
                    </v-select>
                  </v-col>
                  <v-col class="py-0">
                    <div class="text-body-1 my-2">Related Skill*</div>
                    <v-select
                      label="Choose Related Skill"
                      :items="skills"
                      v-model="skillId"
                      outlined
                      item-text="name"
                      item-value="id"
                      class="rounded-xl"
                      :rules="[(v) => !!v || 'Related Skill field is required']"
                      required
                      :disabled="is_psychometric"
                      @change="checkSubjects(skillId)"
                    >
                    </v-select>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col class="py-0">
                    <div class="text-body-1 my-2">Subject</div>
                    <v-select
                      :disabled="!subjectShowBool"
                      label="Choose Subject"
                      :items="subjects"
                      outlined
                      class="rounded-xl"
                      v-model="subject"
                      item-text="name"
                      item-value="id"
                      @change="dependApi()"
                    >
                    </v-select>
                  </v-col>
                  <v-col class="py-0">
                    <div class="text-body-1 my-2">Proficiency Level</div>
                    <v-select
                      label="Choose Proficiency Level"
                      :items="['A1', 'A2', 'B1', 'B2', 'C1', 'C2']"
                      outlined
                      class="rounded-xl"
                      v-model="proficiencyLevel"
                      :rules="[(v) => !!v || 'Proficiency Level is required']"
                    >
                    </v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <div class="text-body-1 my-2">Grade*</div>
                    <v-select
                      :items="gradeList"
                      label="Choose Grade"
                      outlined
                      :rules="[
                        (v) =>  {
                          return !!v || 'Grade is required'
                        },
                      ]"
                      class="rounded-xl"
                      v-model="grade_id"
                      item-text="name"
                      item-value="id"
                      @change="dependApi()"
                    ></v-select>
                  </v-col>
                  <v-col cols="6">
                    <div class="text-body-1 my-2">Strand</div>
                      <v-select
                      :items="strandList"
                      label="Choose Strand"
                      outlined
                      class="rounded-xl"
                      v-model="strand_id"
                      item-text="strand_text"
                      item-value="id"
                      @change="dependApi()"
                    ></v-select>
                  </v-col>
                 
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <div class="text-body-1 my-2">Sub Strand</div>
                    <v-select
                    v-model="sub_strand_id"
                    :items="subStrandList"
                    label="Choose Strand Id"
                    class="rounded-xl"
                    outlined
                    item-text="sub_strand_text"
                    item-value="id"
                    @change="dependApi()"
                  ></v-select>
                  </v-col>
                  <v-col cols="6">
                    <div class="text-body-1 my-2">Topic</div>
                    <v-select
                    :items="topicList"
                    label="Choose Topic"
                    outlined
                    class="rounded-xl"
                    v-model="topic_id"
                    item-text="topic_text"
                    item-value="id"
                  ></v-select>
                  </v-col>
                </v-row>

                <v-row align="center">
                  <v-col col="6" class="py-0">
                    <div class="text-body-1 my-2">Learning Objective</div>
                    <v-autocomplete
                      v-model="selectedLOs"
                      clearable
                      deletable-chips
                      label="Select or Search LO's"
                      outlined
                      class="rounded-xl"
                      chips
                      :search-input.sync="searchLOs"
                      :items="LOData"
                      multiple
                      item-text="name"
                      item-value="io_code"
                    >
                    </v-autocomplete>
                  </v-col>
                </v-row>
                <v-row align="center">
                  <v-col class="py-0">
                    <div class="text-body-1 my-2">Tags</div>
                    <!-- <v-autocomplete
                      v-model="selectedTags"
                      clearable
                      deletable-chips
                      label="Select or Search Tags"
                      outlined
                      class="rounded-xl"
                      chips
                      :items="tagsList"
                      multiple
                    >
                    </v-autocomplete> -->

                    <div outlined class="rounded-xl outlined tag-compo">
                      <v-chip
                        v-for="(tag, index) in tagsList"
                        :key="index"
                        :close="true"
                        @click:close="removeTag(index)"
                        class="ma-2"
                      >
                        {{ tag }}
                      </v-chip>
                      <input
                        class="ma-4 tag-input"
                        placeholder="Enter new tag"
                        @keydown.enter="addTag"
                        v-model="tag"
                      />
                    </div>
                    <div disabled class="text-caption text-medium-emphasis">
                      Separate tags with commas or Enter
                    </div>
                  </v-col>
                </v-row>
              </v-card>
            </v-card-text>
          </v-form>
        </v-card>
      </v-card>
    </div>

    <div v-else>
      <v-row>
        <v-col>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="primary"
                @click="clearValue"
                large
                rounded
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
              >
                <v-icon class="pr-2">mdi-plus</v-icon> Create Question
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="createQuestionDialog = true">
                <v-list-item-title>
                  <v-icon>mdi-book-open-variant </v-icon> CREATE NEW QUESTION
                </v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-title>
                  <v-icon>mdi-file-document-multiple </v-icon> CREATE NEW
                  QUESTIONS IN BULK
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu></v-col
        >
        <v-col cols="4">
          <v-text-field
            label="Search"
            prepend-inner-icon="mdi-magnify"
            v-model="search"
            clearable
          ></v-text-field
        ></v-col>
      </v-row>
      <v-row justify="space-between" class="my-4">
        <v-col>
          <div class="text-h5">Question Bank</div>
        </v-col>
        <v-col class="mt-2">
          <v-row justify="end">
            <v-btn class="primary mx-2" rounded @click="filterDialog = true"
              ><v-icon>mdi-tune</v-icon>Filter</v-btn
            ><v-btn
              class="primary mx-2"
              rounded
              @click="deleteDialog = true"
              :disabled="selectedTableItems.length == 0"
              ><v-icon>mdi-trash-can-outline</v-icon>Delete</v-btn
            ><v-btn class="primary mx-2" rounded
              ><v-icon>mdi-export</v-icon>Export</v-btn
            >
            <v-dialog v-model="deleteDialog" max-width="366px" persistent>
              <v-card fluid>
                <v-container fluid class="pa-0">
                  <v-card-text class="text-center">
                    <v-icon size="70" class="pt-4"
                      >mdi-trash-can-outline</v-icon
                    >
                    <p class="text-h5 pt-4 pb-0">Delete Question</p>
                    <p
                      class="text-disabled grey--text text-subtitle-1"
                      color="rgba(0, 0, 0, 0.6)"
                      disabled
                    >
                      This action will permanently delete the item . This cannot
                      be undone
                    </p>

                    <div class="d-flex justify-space-between" fluid>
                      <v-btn
                        depressed
                        class="secondary black--text"
                        large
                        width="157px"
                        rounded
                        @click="
                          () => {
                            deleteDialog = false;
                            formbtnBool = false;
                          }
                        "
                        >CANCEL</v-btn
                      >
                      <v-btn
                        class="black white--text"
                        depressed
                        large
                        width="157px"
                        rounded
                        :disabled="selectedTableItems.length == 0"
                        @click="deleteData(selectedTableItems)"
                        >DELETE</v-btn
                      >
                    </div>
                  </v-card-text>
                </v-container>
              </v-card>
            </v-dialog>
          </v-row>
        </v-col>
      </v-row>
      <v-data-table
        v-model="selectedTableItems"
        :headers="headers"
        :items="tableData"
        show-select
        :single-select="singleSelect"
        item-key="id"
        :items-per-page="-1"
        :options.sync="dataTableOptions"
        :server-items-length="count"
        :footer-props="{
          itemsPerPageOptions: [10, 25, 50, 100],
        }"
      >
        <template v-slot:[`item.statement`]="{ item }">
          <div v-html="item.statement"></div>
        </template>
        <template v-slot:[`item.MyLo`]="{}">
          <span
            ><v-chip>{{ dummyLO[0].name }}</v-chip></span
          >
          <span v-if="dummyLO.length > 1"
            ><v-chip>+{{ dummyLO.length - 1 }}</v-chip></span
          >
        </template>
        <template v-slot:[`item.created_at`]="{ item }">
          {{ getDate(item.created_at) }}
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <div class="d-flex flex-row">
            <img
              width="36px"
              height="36px"
              @click="updateData(item)"
              class="cursor"
              src="../assets/edit.svg"
            />
          </div>
        </template>
      </v-data-table>
      <!-- Create Question Dialog Form -->

      <!-- Filter Dialog -->
      <v-dialog v-model="filterDialog" max-width="400px">
        <v-card width="400px" height="100%">
          <v-card-text class="pa-6">
            <v-row>
              <v-col>
                <div class="pl-1 text-body1 font-weight-bold">FILTER</div>
              </v-col>
              <v-spacer></v-spacer>
              <v-col>
                <div
                  class="text-body1 font-weight-bold black--text cursor"
                  @click="clearFilter"
                >
                  CLEAR FILTER
                </div>
              </v-col>
            </v-row>
            <div>
              <v-card
                height="450px"
                elevation="0"
                id="myScroll"
                class="pt-5 ,pb-5"
              >
                <v-row class="pl-1">
                  <v-col>
                    <div class="text-body1 font-weight-normal black--text">
                      Question Type
                    </div>
                  </v-col>
                </v-row>
                <v-chip-group
                  v-model="selectedQuestionTypeFilter"
                  active-class="primary"
                  column
                  :multiple="true"
                >
                  <v-chip
                    v-for="(questionType, index) in questionTypeList"
                    :key="index"
                    :value="questionType"
                    elevated
                  >
                    {{ questionType }}
                  </v-chip>
                </v-chip-group>

                <v-row class="pl-1">
                  <v-col>
                    <div class="text-body1 font-weight-normal black--text pt-3">
                      Level
                    </div>
                  </v-col>
                </v-row>
                <v-chip-group
                  v-model="selectedLevelFilter"
                  active-class="primary"
                  column
                  :multiple="true"
                >
                  <v-chip
                    v-for="(level, index) in levels"
                    :key="index"
                    :value="level"
                    elevated
                  >
                    {{ level.name }}
                  </v-chip>
                </v-chip-group>

                <v-row class="pl-1">
                  <v-col>
                    <div class="text-body1 font-weight-normal black--text pt-3">
                      Difficulty Level
                    </div>
                  </v-col>
                </v-row>
                <v-chip-group
                  v-model="selecteddifficultyLevelFilter"
                  active-class="primary"
                  column
                  :multiple="true"
                >
                  <v-chip
                    v-for="(difficultyLevel, index) in difficultyLevels"
                    :key="index"
                    :value="difficultyLevel"
                    elevated
                  >
                    {{ difficultyLevel }}
                  </v-chip>
                </v-chip-group>

                <v-row class="pl-1">
                  <v-col>
                    <div class="text-body1 font-weight-normal black--text pt-3">
                      Complexity Level
                    </div>
                  </v-col>
                </v-row>
                <v-chip-group
                  v-model="selectedcomplexityLevelFilter"
                  active-class="primary"
                  column
                  :multiple="true"
                >
                  <v-chip
                    v-for="(complexityLevel, index) in complexityLevels"
                    :key="index"
                    :value="complexityLevel"
                    elevated
                  >
                    {{ complexityLevel }}
                  </v-chip>
                </v-chip-group>

                <v-row class="pl-1">
                  <v-col>
                    <div class="text-body1 font-weight-normal black--text pt-3">
                      Knowlewdge Level
                    </div>
                  </v-col>
                </v-row>
                <v-chip-group
                  v-model="selectedknowlewdgeLevelFilter"
                  active-class="primary"
                  column
                  :multiple="true"
                >
                  <v-chip
                    v-for="(knowlewdgeLevel, index) in knowledgeLevels"
                    :key="index"
                    :value="knowlewdgeLevel"
                    elevated
                  >
                    {{ knowlewdgeLevel }}
                  </v-chip>
                </v-chip-group>

                <v-row class="pl-1">
                  <v-col>
                    <div class="text-body1 font-weight-normal black--text pt-3">
                      Blooms Taxonomy Level
                    </div>
                  </v-col>
                </v-row>
                <v-chip-group
                  v-model="selectedbloomsTaxonomyLevelFilter"
                  active-class="primary"
                  column
                  :multiple="true"
                >
                  <v-chip
                    v-for="(bloomsTaxonomyLevel, index) in bloomsTaxonomyLevel"
                    :key="index"
                    :value="bloomsTaxonomyLevel"
                    elevated
                  >
                    {{ bloomsTaxonomyLevel }}
                  </v-chip>
                </v-chip-group>

                <v-row class="pl-1">
                  <v-col>
                    <div class="text-body1 font-weight-normal black--text pt-3">
                      Skills
                    </div>
                  </v-col>
                </v-row>
                <v-chip-group
                  v-model="selectedskillsFilter"
                  active-class="primary"
                  column
                  :multiple="true"
                >
                  <v-chip
                    v-for="(skill, index) in skills"
                    :key="index"
                    :value="skill"
                    elevated
                  >
                    {{ skill.name }}
                  </v-chip>
                </v-chip-group>

                <v-row class="pl-1">
                  <v-col>
                    <div class="text-body1 font-weight-normal black--text pt-3">
                      Subjects
                    </div>
                  </v-col>
                </v-row>
                <v-chip-group
                  v-model="selectedsubjectsFilter"
                  active-class="primary"
                  column
                  :multiple="true"
                >
                  <v-chip
                    v-for="(subject, index) in subjects"
                    :key="index"
                    :value="subject"
                    elevated
                  >
                    {{ subject.name }}
                  </v-chip>
                </v-chip-group>
              </v-card>
              <div>
                <v-card-actions class="px-6 pb-6">
                  <v-spacer></v-spacer>
                  <v-btn
                    rounded
                    outlined
                    class="pa-4"
                    @click="filterDialog = false"
                    >Cancel</v-btn
                  >
                  <v-btn
                    rounded
                    class="primary pa-4"
                    @click="
                      filterQuestions(
                        selectedQuestionTypeFilter,
                        selectedLevelFilter,
                        selecteddifficultyLevelFilter,
                        selectedcomplexityLevelFilter,
                        selectedknowlewdgeLevelFilter,
                        selectedbloomsTaxonomyLevelFilter,
                        selectedskillsFilter,
                        selectedsubjectsFilter
                      )
                    "
                    >Apply</v-btn
                  >
                </v-card-actions>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>
      <!-- Success Dialog -->
      <v-dialog v-model="successDialog" max-width="366px" persistent>
        <v-card>
          <v-container fluid class="pa-8">
            <v-card-text class="text-center">
              <v-icon color="success" size="96"
                >mdi-check-circle-outline</v-icon
              >
              <p class="text-h5 py-4">{{ successMessage }}</p>
              <v-btn
                class="primary"
                large
                width="157px"
                rounded
                @click="successDialog = false"
                v-on:click="reload"
                >OK</v-btn
              >
            </v-card-text>
          </v-container>
        </v-card>
      </v-dialog>
     

    </div>
    <!-- Error Dialog -->
    <v-dialog v-model="errorDialog" max-width="366px" persistent>
      <v-card>
        <v-container fluid class="pa-8">
          <v-card-text class="text-center">
            <v-icon color="error" size="96">mdi-close-circle-outline</v-icon>
            <p class="text-h5 pt-2 font-weight-medium">Error</p>
            <p class="text-h6 py-3 font-weight-regular">{{ errorMessage }}</p>
            <v-btn
              class="primary"
              large
              width="157px"
              rounded
              @click="errorDialog = false"
              >OK</v-btn
            >
          </v-card-text>
        </v-container>
      </v-card>
    </v-dialog>
    <!-- Edit Option Dialog -->
    <v-dialog max-width="887px" v-model="optionTextFieldDialog" center>
      <v-card>
        <v-card-title class="secondary mb-8">Edit Option</v-card-title>
        <v-card-text>
          <!-- <v-text-field
            outlined
            class="rounded-xl"
            v-model="editedOption.value"
            label="Enter Option*"
          ></v-text-field> -->
          <ckeditor
            :config="editorConfigForOption"
            v-model="editedCkeditorValue"
            class="m-ckeditor"
          ></ckeditor>
        </v-card-text>
        <v-card-actions class="px-6 pb-6">
          <v-spacer></v-spacer>
          <v-btn
            rounded
            outlined
            class="pa-4"
            @click="optionTextFieldDialog = false"
            >Cancel</v-btn
          >
          <v-btn rounded @click="saveEditedValue" class="primary pa-4"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog max-width="887px" v-model="optionTextFieldDialogAns" center>
      <v-card>
        <v-card-title class="secondary mb-8">Edit Option</v-card-title>
        <v-card-text>
          <!-- <v-text-field
            outlined
            class="rounded-xl"
            v-model="editedOption.value"
            label="Enter Option*"
          ></v-text-field> -->
          <ckeditor
            :config="editorConfigForAns"
            v-model="editedCkeditorValueAns"
            class="m-ckeditor"
          ></ckeditor>
        </v-card-text>
        <v-card-actions class="px-6 pb-6">
          <v-spacer></v-spacer>
          <v-btn
            rounded
            outlined
            class="pa-4"
            @click="optionTextFieldDialogAns = false"
            >Cancel</v-btn
          >
          <v-btn rounded @click="saveEditedAnswer" class="primary pa-4"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import UploadController from "@/controllers/UploadController";
import QuestionsController from "../controllers/QuestionsController";
import LoBankController from "@/controllers/LoBankController";
import SubjectController from "@/controllers/SubjectController";
import SkillsController from "@/controllers/SkillsController";
import GradeController from "@/controllers/GradeController";
import MetaController from "@/controllers/MetaController";
import LevelController from "@/controllers/LevelController";

import { v4 as uuidv4 } from 'uuid';
export default {
  name: "QuestionBankView",
  data() {
    return {
      questionUuid:'',
      editorConfig: {
        extraPlugins: "ckeditor_wiris",
      },
      editorConfigForOption: {
        extraPlugins: "ckeditor_wiris",
      },
      editorConfigForAns: {
        extraPlugins: "ckeditor_wiris",
      },
      filterData: false,
      windowHeight: window.innerHeight,
      dataTableOptions: {},
      totalItems: 0,
      pageSize: 10,
      page: 1,
      count: 0,
      preSignedUrl: "",
      selectedFile: null,
      questionAssetUrl: "",
      questionAssetType: null,
      uploadingForOption: false,
      tableData: [],
      selectedLOs: [],
      selectedTags: [],
      is_psychometric: false,
      LOData: [],
      skills: [],
      search: "",
      editId: null,
      formbtnBool: false,
      subjectData: [],
      topicList: [],
      selectedAnswersForMultitpleTypeQuestions: [],
      searchLOs: "",
      singleSelect: false,
      createQuestionDialog: true,
      deleteDialog: false,
      optionTextFieldDialog: false,
      editedOptionIndex: 0,
      editedCkeditorValue: "",
      editedCkeditorValueAns: "",
      successDialog: false,
      successMessage: "New Question Created",
      errorDialog: false,
      filterDialog: false,
      selectedTableItems: [],
      uploadingDialog: false,
      uploadingMsg: "File Uploading...",
      questionType: "",
      questionName: "",
      optionTextFieldDialogAns: false,
      answerExplanation: "",
      questionDescription: "NA",
      errorMessage: "",
      skillId: 0,
      grade_id: -1,
      set_number: 1,
      level: 0,
      searchBool: false,
      tag: "",
      correctAnswerScore: 0,
      estimatedTime: 0,
      bloomsTaxonomy: null,
      knowledgeLevel: null,
      complexityLevel: null,
      difficultyLevel: null,
      sub_strand_id: null,
      strand_id: null,
      topic_id: null,
      correctAnswer: "NA",
      hint: "",
      subjectShowBool: false,
      subject: null,
      proficiencyLevel: null,

      isCreatingQuestion: false,
      dummyLO: [{ name: "lO1_1" }, { name: "lO1_2" }, { name: "lO1_3" }],
      rules: {
        required: (value) => !!value || "Field is required",
      },
      options: [
        {
          option_key: "A",
          option_value: "Option 1",
          option_type: "TEXT",
          is_correct: false,
          option_uuid: uuidv4()
        },
        {
          option_key: "B",
          option_value: "Option 2",
          option_type: "TEXT",
          is_correct: false,
          option_uuid: uuidv4()
        },
        {
          option_key: "C",
          option_value: "Option 3",
          option_type: "TEXT",
          is_correct: false,
          option_uuid: uuidv4()
        },
        {
          option_key: "D",
          option_value: "Option 4",
          option_type: "TEXT",
          is_correct: false,
          option_uuid: uuidv4()
        },
      ],
      headers: [
        { text: "Question", value: "statement", cellClass: "w-60" },
        { text: "Question Type", value: "question_type" },
        // { text: "Learning Objective", value: "learning_objective_id" },
        { text: "Learning Objective", value: "MyLo", cellClass: "w-action" },
        { text: "Created On", value: "created_at", cellClass: "w-action" },
        { text: "Actions", value: "actions", cellClass: "w-action" },
      ],

      questionTypeList: [
        "SINGLE_CHOICE",
        "MULTIPLE_CHOICE",
        "FILL_IN_THE_BLANKS",
        "TRUE_FALSE",
        "MATCH_THE_FOLLOWING",
      ],
      correctTrueFalse: null,
      selectedQuestionTypeFilter: [],
      levels: [],
      gradeList: [],
      
      strandList: [],
      singleSelectCorrectAnswer: null,
      trueFalseCorrectAnswer: null,
      selectedLevelFilter: [],
      difficultyLevels: ["EASY", "MEDIUM", "HARD", "VERY_HARD"],
      selecteddifficultyLevelFilter: [],
      complexityLevels: ["P1", "P2", "P3", "P4", "P5"],
      selectedcomplexityLevelFilter: [],
      knowledgeLevels: ["MUST_KNOW", "SHOULD_KNOW", "NICE_TO_KNOW"],
      selectedknowlewdgeLevelFilter: [],
      bloomsTaxonomyLevel: [
        "REMEMBER",
        "UNDERSTAND",
        "APPLY",
        "ANALYZE",
        "EVALUTE",
        "CREATE",
      ],
      selectedbloomsTaxonomyLevelFilter: [],
      selectedskillsFilter: [],
      subjects: [],
      selectedsubjectsFilter: [],

      selectedlearningObjectives: [],
      tagsList: [],
      subStrandList: [],
      selectedtags: [],
      mtfAnswers: [
        {
          answer_key: 'A',
          answer_value: "Answer 1",
          answer_type: "TEXT",
          answer_uuid: uuidv4(),
        },
        {
          answer_key: 'B',
          answer_value: "Answer 2",
          answer_type: "TEXT",
          answer_uuid: uuidv4(),
        },
        {
          answer_key: 'C',
          answer_value: "Answer 3",
          answer_type: "TEXT",
          answer_uuid: uuidv4(),
        },
        {
          answer_key: 'D',
          answer_value: "Answer 4",
          answer_type: "TEXT",
          answer_uuid: uuidv4(),
        },
      ],
    };
  },
  watch: {
    is_psychometric: {
      handler: function(newVal, oldVal) {
        if (oldVal !== newVal) {
          console.log(newVal);
          if(newVal && this.editId == null) {
            this.questionType = 'SINGLE_CHOICE';
            this.skillId = 48;
          }
        }
      }
    },
    dataTableOptions: {
      handler() {
        this.pageSize = this.dataTableOptions.itemsPerPage;
        this.page = this.dataTableOptions.page;
        if (this.filterData) {
          this.filterQuestions(
            this.selectedQuestionTypeFilter,
            this.selectedLevelFilter,
            this.selecteddifficultyLevelFilter,
            this.selectedcomplexityLevelFilter,
            this.selectedknowlewdgeLevelFilter,
            this.selectedbloomsTaxonomyLevelFilter,
            this.selectedskillsFilter,
            this.selectedsubjectsFilter
          );
        } else if (this.searchBool) {
          this.searchData(this.search);
        } else {
          this.fetchQuestions();
        }
      },
      deep: true,
    },
    search(newValue) {
      console.log(newValue);
      this.searchBool = true;
      this.pageSize = this.dataTableOptions.itemsPerPage;
      this.page = this.dataTableOptions.page;
      this.dataTableOptions.page = 1;
      this.searchData(newValue);
      if (newValue == "" || newValue == null) {
        this.fetchQuestions();
        this.searchBool = false;
      }
    },
    tag(newValue) {
      console.log(newValue.indexOf(","));
      if (newValue.indexOf(",") != -1) {
        var temp = newValue.split(",")[0];
        if (temp != "") {
          this.tagsList.push(temp);
        }
        this.tag = "";
        console.log("value inside", this.tag);
      }
      console.log("index value", newValue.indexOf(","));
      console.log("outside", this.tag);
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  computed: {
    getHeight() {
      return this.windowHeight;
    },
  },
  methods: {
    saveEditedValue() {
      this.options[this.editedOptionIndex].option_value =
        this.editedCkeditorValue;
      this.options[this.editedOptionIndex].option_type = 'TEXT';

      this.optionTextFieldDialog = false;
    },
    saveEditedAnswer() {
      this.mtfAnswers[this.editedOptionIndex].answer_value =
        this.editedCkeditorValueAns;
      this.optionTextFieldDialogAns = false;
    },
    getAlphabet(num) {
      // ASCII value for 'A' is 65
      // The alphabet letter corresponding to num can be calculated by adding num to 65 and then getting the character using fromCharCode()
      return String.fromCharCode(65 + num);
    },
    getLastPart(url) {
      const parts = url.split('/');
      return parts.at(-1);
    },
    clearValue() {
      (this.questionName = ""), (this.questionType = "");
      (this.questionDescription = "NA"),
        (this.selectedLOs = []),
        (this.skillId = 0),
        (this.subject = null),
        (this.correctAnswerScore = 0),
        (this.estimatedTime = 0),
        (this.bloomsTaxonomy = ""),
        (this.knowledgeLevel = ""),
        (this.complexityLevel = ""),
        (this.difficultyLevel = ""),
        (this.proficiencyLevel = ""),
        (this.level = 0),
        (this.hint = ""),
        (this.answerExplanation = ""),
        (this.selectedTags = []),
        (this.formbtnBool = false);
    },
    checkSubjects(id) {
      console.log("checkSubjects", id);
      if (id == null) {
        this.subjectShowBool = false;
      } else {
        console.log(id);
        const skill = this.skills.find((skill) => skill.id == id);
        //console.log(skill);
        if (skill.subject_skills.length == 0) {
          this.subjectShowBool = false;
          if (!this.subjectShowBool) {
            this.subject = null;
            console.log("dvhgb", this.subject);
          }
        } else {
          this.subjectShowBool = true;
        }
      }
      this.dependApi();
    },
    async searchData(search) {
      const response = await QuestionsController.searchQuestion(
        this.pageSize,
        this.page,
        search
      );
      console.log(response.data);
      console.log(this.searchBool);
      this.count = response.data.data.count;
      this.tableData = response.data.data.rows;
    },

    addTag() {
      if (this.tag && !this.tagsList.includes(this.tag)) {
        this.tagsList.push(this.tag);
        this.tag = "";
      }
    },
    removeTag(index) {
      this.tagsList.splice(index, 1);
    },
    reload() {
      console.log("Reload");
      this.$router.go(0);
      //window.location.reload();
    },

    onResize() {
      this.windowHeight = window.innerHeight;
    },
    onChange(e) {
      this.selectedFile = e.target.files[0];
      this.uploadingMsg = 'File Uploading...'
      console.log("selected file",this.selectedFile)
      this.uploadingDialog = true;
      this.getPreSignedUrl();
    },
    async getPreSignedUrl() {
      const response = await UploadController.getPreSignedUrl({
        context: "question-bank",
        file_name: this.selectedFile.name,
        mime_type: this.selectedFile.type,
        file_type: this.selectedFile.type,
        business_type: "b2c",
        question_uuid: this.questionUuid,
        option_uuid: this.uploadingForOption?  this.options[this.editedOptionIndex].option_uuid:'',
      });
      this.preSignedUrl = response.data.data.signed_request;
     
      this.uploadToS3(response.data.data.url);
    },
    async uploadToS3(imgUrl) {
      console.log("Image URL: ",imgUrl);
      console.log("Pre-Signed URL: ", this.preSignedUrl);
      const uploadResponse = await UploadController.uploadFile(
        this.preSignedUrl,
        this.selectedFile
      );
      if (this.uploadingForOption) {
        this.options[this.editedOptionIndex].option_value = imgUrl;
        this.options[this.editedOptionIndex].option_type = "IMAGE";
      } else {
        this.questionAssetUrl = imgUrl;
        this.questionAssetType = this.selectedFile.type;
        console.log(this.selectedFile.type);
      }
      this.uploadingForOption = false;
      this.uploadingMsg = "File uploaded";
      this.selectedFile = null
      console.log("Upload Response: ", uploadResponse);
    },
    formbtn() {
      return this.formbtnBool === false ? "Create" : "Update";
    },
    async updateInput(id) {
      console.log("update called");

      var selectTags = "";
      this.selectedTags.forEach((item) => {
        selectTags = selectTags + item + ",";
      });
      selectTags = selectTags.slice(0, -1);

      //if (this.$refs.form.validate()) {
      const response = await QuestionsController.updateQuestion(
        {
          statement: this.questionName,
          question_type: this.questionType,
          questionDescription: this.questionDescription,
          s3url: this.questionAssetUrl,
          mime_type:this.questionAssetType,
          lo_ids: this.selectedLOs,
          skill_id: this.skillId,
          topic_id: this.topic_id,
          strand_id: this.strand_id,
          sub_strand_id: this.sub_strand_id,
          subject_id: this.subject  == null ? -1 : this.subject,
          correct_answer_score: this.correctAnswerScore,
          estimated_time: this.estimatedTime,
          blooms_taxonomy: this.bloomsTaxonomy,
          knowledge_level: this.knowledgeLevel,
          complexity_level: this.complexityLevel,
          difficulty_level: this.difficultyLevel,
          proficiency_level: this.proficiencyLevel,
          correct_answer: this.getCorrectAnswer(), 
          question_mtf_answers: this.questionType == 'MATCH_THE_FOLLOWING' ? this.mtfAnswers : null,
          level_id: this.level,
          hint: this.hint,
          is_psychometric: this.is_psychometric,
          tags: selectTags,
          set_number: this.set_number,
          grade_id: this.grade_id  == null ? -1 : this.grade_id,
          answer_explanation: this.answerExplanation,
          question_options: this.getOptions(),
        },
        id
      );
      console.log(response.data);
      if (response.data.success) {
        this.isCreatingQuestion = false;
        this.successMessage = "Question Updated Successfully";
        this.successDialog = true;
        this.createQuestionDialog = false;
        window.location.href = "/#/question-bank";
      } else {
        this.isCreatingQuestion = false;
        this.errorDialog = true;
      }
      // }
    },

    updateData(item) {
      this.editId = item.id; // selected id for edit
      this.formbtnBool = true; // change update/create btn value
      this.createQuestionDialog = true;
      this.questionType = item.question_type ? item.question_type : 'SINGLE_CHOICE' ;
      this.skillId = item.skill_id;
      this.is_psychometric = item.skill_id == 48 ? true : false;
      this.correctAnswerScore = item.correct_answer_score;
      this.estimatedTime = item.estimated_time != '' ? parseInt(item.estimated_time) : 0 ;
      this.bloomsTaxonomy = item.blooms_taxonomy != '' ? item.blooms_taxonomy : null;
      this.knowledgeLevel = item.knowledge_level != '' ? item.knowledge_level : null;
      this.complexityLevel = item.complexity_level != '' ? item.complexity_level : null;
      this.difficultyLevel = item.difficulty_level != '' ? item.difficulty_level : null;
      this.grade_id = item.grade_id;
      this.correct_answer = item.correct_answer;
      this.hint = item.hint;
      this.set_number = item.set_number;
     
      this.subject = item.subject_id == -1 ? null : item.subject_id;
      this.proficiencyLevel = item.proficiency_level != '' ? item.proficiency_level : null;
      this.level = item.level_id;
      this.strand_id = item.strand_id;
      this.sub_strand_id = item.sub_strand_id;
      this.topic_id = item.topic_id;
      this.options = item.question_options;
      this.mtfAnswers = item.question_mtf_answers.length > 0 ? item.question_mtf_answers : this.mtfAnswers;
      this.questionAssetType = item.mime_type;
      this.questionAssetUrl = item.s3url;
      this.selectedFile = null;
      this.trueFalseCorrectAnswer = this.questionType == 'TRUE_FALSE' ? item.correct_answer : null;
      this.selectedAnswersForMultitpleTypeQuestions = [];
      this.singleSelectCorrectAnswer = null;
      item.question_options.forEach(ele => {
        if(ele.is_correct) {
          this.selectedAnswersForMultitpleTypeQuestions.push(ele.option_key);
          this.singleSelectCorrectAnswer = ele.option_key;
        }
      });
      this.dependApi(item.topic_id, item.strand_id, item.sub_strand_id);

     

      if(this.subject > 0) {
        this.subjectShowBool = true;
      }


      console.log("tetststst",this.subject,this.selectedAnswersForMultitpleTypeQuestions, this.questionAssetUrl, item);
      
      // this.selectedLOs = item.lo_ids data not comming
      this.answerExplanation = item.answer_explanation;

      setTimeout(() => {
        // This code will execute after a 1 second delay
        this.questionName = item.statement;
        
      }, 2000);
    },
    getDate(timeStamp) {
      return new Date(timeStamp).toString().substring(0, 16);
    },
    async deleteData(data) {
      //console.log("getting data", data);
      if (data.length == 1) {
        const response = await QuestionsController.deleteQuestion(data[0].id);
        if (response.data.success) {
          this.fetchQuestions();
          console.log(response);
        } else {
          alert(response.data.error);
        }
      } else {
        var ids = "";
        for (var i = 0; i < data.length; i++) {
          ids = ids + data[i].id;
          if (i != data.length - 1) {
            ids = ids + ",";
          }
        }
        const response = await QuestionsController.deleteBulkQuestion(ids);
        if (response.data.success) {
          this.fetchQuestions();
          console.log(response);
        } else {
          alert(response.data.error);
        }
      }

      //console.log("deleted", response);
      this.deleteDialog = false;
      this.selectedTableItems.length = "0";
    },
    async getLO() {
      const response = await LoBankController.getLO();
      //console.log(response);
      this.LOData = response.data.data.rows;
    },
    async getLevels() {
      const response = await LevelController.getLevel();
      this.levels = response.data.data.rows;
      // console.log("level data", this.levelData.rows);
    },
    async getSkills() {
      const response = await SkillsController.getSkills();
      //console.log(response);
      this.skills = response.data.data.rows;
    },
    async getSubjects() {
      const response = await SubjectController.getSubject();
      //console.log(response);
      this.subjects = response.data.data.rows;
    },
    addOption() {
      this.options.push({
        option_key: this.getAlphabet(this.options.length),
        option_value: "Option " + (this.options.length + 1),
        option_type: "TEXT",
        is_correct: false,
        option_uuid: uuidv4()
      });
      console.log(this.options);
    },
    removeOption(index) {
      this.options.splice(index, 1);
    },
    getCorrectAnswer() {
      switch (this.questionType) {
        case "SINGLE_CHOICE":
          this.options.forEach((option) => {
            if (option.option_key == this.singleSelectCorrectAnswer) {
              option.is_correct = true;
            } else {
              option.is_correct = false;
            }
          });
          return this.singleSelectCorrectAnswer;

        case "MULTIPLE_CHOICE":
          this.options.forEach((option) => {
            if (
              this.selectedAnswersForMultitpleTypeQuestions.includes(
                option.option_key
              )
            ) {
              option.is_correct = true;
            } else {
              option.is_correct = false;
            }
          });
          return this.selectedAnswersForMultitpleTypeQuestions.join(',');

        case "FILL_IN_THE_BLANKS":
          return this.correctAnswer;

        case "TRUE_FALSE":
          return this.trueFalseCorrectAnswer;

        case "MATCH_THE_FOLLOWING":
          return 'NA';

        default:
          break;
      }
    },
    getOptions() {
      switch (this.questionType) {
        case "SINGLE_CHOICE":
          return this.options;

        case "MULTIPLE_CHOICE":
          return this.options;

        case "FILL_IN_THE_BLANKS":
          return [];

        case "TRUE_FALSE":
          return [
            {
              option_key: "A",
              option_value: "TRUE",
              option_type: "TEXT",
            },
            {
              option_key: "B",
              option_value: "FALSE",
              option_type: "TEXT",
            },
          ];

        case "MATCH_THE_FOLLOWING":
          return this.options;

        default:
          break;
      }
    },

    async createQuestion() {
      if (this.$refs.form.validate()) {
        var selectTags = "";
        this.selectedTags.forEach((item) => {
          selectTags = selectTags + item + ",";
        });
        selectTags = selectTags.slice(0, -1);
        console.log(selectTags);
        this.isCreatingQuestion = true;

        let payload = {
          uuid:this.questionUuid,
          statement: this.questionName,
          question_type: this.questionType,
          questionDescription: this.questionDescription,
          s3url: this.questionAssetUrl,
          mime_type:this.questionAssetType,
          lo_ids: this.selectedLOs,
          skill_id: this.skillId,
          subject_id: this.subject  == null ? -1 : this.subject,
          correct_answer_score: this.correctAnswerScore,
          estimated_time: this.estimatedTime,
          blooms_taxonomy: this.bloomsTaxonomy,
          knowledge_level: this.knowledgeLevel,
          complexity_level: this.complexityLevel,
          difficulty_level: this.difficultyLevel,
          proficiency_level: this.proficiencyLevel,
          correct_answer: this.getCorrectAnswer(), 
          question_mtf_answers: this.questionType == 'MATCH_THE_FOLLOWING' ? this.mtfAnswers : null,
          level_id: this.level,
          strand_id: this.strand_id,
          sub_strand_id: this.sub_strand_id,
          topic_id: this.topic_id,
          hint: this.hint,
          tags: selectTags,
          grade_id: this.grade_id  == null ? -1 : this.grade_id,
          answer_explanation: this.answerExplanation,
          question_options: this.getOptions(),
          is_psychometric: this.is_psychometric,
          set_number: this.set_number
        };
        console.log(payload);
        // return false;
        const response = await QuestionsController.createQuestion(payload);
        console.log("create question res",response.data.success);
        if (response.data.success) {
          this.isCreatingQuestion = false;
          this.successDialog = true;
          this.createQuestionDialog = false;
          window.location.href = "/#/question-bank";
        } else {
          this.isCreatingQuestion = false;
          this.errorDialog = true;
          this.errorMessage = response.data.error;
        }
      }
    },
    editOption(index) {
      console.log("Edit Option Called");
      console.log("Checkpoint 1:", this.options);
      this.editedOptionIndex = index;
      this.optionTextFieldDialog = true;
      setTimeout(() => {
        this.editedCkeditorValue =
          this.options[this.editedOptionIndex].option_value;

        // This code will execute after a 1 second delay
        //this.options[this.editedOptionIndex] = this.options[index];
      }, 1000);
      console.log("Checkpoint 2:", this.options);
    },
    editAnswer(index) {
      console.log("Edit Option Called");
      console.log("Checkpoint 1:", this.options);
      this.editedOptionIndex = index;
      this.optionTextFieldDialogAns = true;
      setTimeout(() => {
        this.editedCkeditorValueAns =
          this.mtfAnswers[this.editedOptionIndex].answer_value;

        // This code will execute after a 1 second delay
        //this.options[this.editedOptionIndex] = this.options[index];
      }, 1000);
      console.log("Checkpoint 2:", this.options);
    },
    async fetchQuestions(questionId) {
      const response = await QuestionsController.getQuestions(
        this.pageSize,
        this.page,
        questionId
      );
      console.log(response.data);
      this.count = response.data.data.count;
      this.tableData = response.data.data.rows;
      this.updateData(this.tableData[0])
    },
    async deleteQuestion() {
      await QuestionsController.deleteQuestion();
      //console.log(response.data);
    },
    clearFilter() {
      this.selectedQuestionTypeFilter = [];
      this.selectedLevelFilter = [];
      this.selecteddifficultyLevelFilter = [];
      this.selectedcomplexityLevelFilter = [];
      this.selectedknowlewdgeLevelFilter = [];
      this.selectedbloomsTaxonomyLevelFilter = [];
      this.selectedskillsFilter = [];
      this.selectedsubjectsFilter = [];
      this.fetchQuestions();
      this.filterDialog = false;
      this.filterData = false;
    },
    async filterQuestions(
      questionTypeIds,
      levelIds,
      diffLevelIds,
      complexityLevelIds,
      knowledgeLevelIds,
      bloomsTaxonomy,
      skillIds,
      subjectIds
    ) {
      //console.log("filter function call");
      var questionIds = "";
      var levelId = "";
      var diffLevelId = "";
      var compLevelIds = "";
      var knowLevelIds = "";
      var bloomsLevelIds = "";
      var skillsId = "";
      var subIds = "";
      questionTypeIds.forEach((item) => {
        questionIds = questionIds + item + ",";
      });
      levelIds.forEach((item) => {
        levelId = levelId + item.id + ",";
      });
      diffLevelIds.forEach((item) => {
        diffLevelId = diffLevelId + item + ",";
      });
      complexityLevelIds.forEach((item) => {
        compLevelIds = compLevelIds + item + ",";
      });
      knowledgeLevelIds.forEach((item) => {
        knowLevelIds = knowLevelIds + item + ",";
      });
      bloomsTaxonomy.forEach((item) => {
        bloomsLevelIds = bloomsLevelIds + item + ",";
      });
      skillIds.forEach((item) => {
        skillsId = skillsId + item.id + ",";
      });
      subjectIds.forEach((item) => {
        subIds = subIds + item.id + ",";
      });
      questionIds = questionIds.slice(0, -1);
      levelId = levelId.slice(0, -1);
      diffLevelId = diffLevelId.slice(0, -1);
      compLevelIds = compLevelIds.slice(0, -1);
      knowLevelIds = knowLevelIds.slice(0, -1);
      bloomsLevelIds = bloomsLevelIds.slice(0, -1);
      skillsId = skillsId.slice(0, -1);
      subIds = subIds.slice(0, -1);
      const response = await QuestionsController.filterQuestion(
        questionIds,
        levelId,
        diffLevelId,
        compLevelIds,
        knowLevelIds,
        bloomsLevelIds,
        skillsId,
        subIds,
        this.pageSize,
        this.page
      );
      console.log("filter responce", response);
      //console.log("skillsId", skillsId);
      this.filterDialog = false;
      this.tableData = response.data.data.rows;
      this.count = response.data.data.count;
      this.filterData = true;
    },
    async getGrades() {
      const response = await GradeController.getAllGradesByPagination(
        this.pageSize,
        this.page);
        if (response.data.success) {
          console.log("",response);
          this.gradeData = response.data.data;
          this.gradeList = this.gradeData.rows;
          this.gradeList = [...[{id: -1, name: "Unknown" }], ...this.gradeList]
          this.count = response.data.data.count;
      }
      else {
        alert(response.data.error)
      }
    

    },
    dependApi(topic_id = null, strand_id = null, sub_strand_id = null) {
      
      this.getStrands(strand_id);
      this.getSubStrand(sub_strand_id);
      this.getTopics(topic_id);
    },
    async getTopics(topic_id) {
      const response = await MetaController.getTopics({level_id: this.level, skill_id: this.skillId > 0 ? this.skillId : undefined, grade_id: this.grade_id > 0 ? this.grade_id : undefined, subject_id: this.subject > 0 ? this.subject : undefined, strand_id: this.strand_id, sub_strand_id: this.sub_strand_id});
      if (response.data.success) {
        this.topicList = response.data.data.rows;
        if(topic_id) {
          this.topic_id = topic_id;
        }
      }
      else {
        alert(response.data.error)
      }
    },
    async getStrands(strand_id) {
      const response = await MetaController.getStrands({level_id: this.level,  grade_id: (this.grade_id > 0 ? this.grade_id : undefined)});
      if (response.data.success) {
        this.strandList = response.data.data.rows;
        if(strand_id) {
          this.strand_id = strand_id;
        }
      }
    },

    async getSubStrand(sub_strand_id) {
      const response = await MetaController.getSubStrand({strand_id: (this.strand_id > 0 ? this.strand_id : undefined) });
      if (response.data.success) {
        this.subStrandList = response.data.data.rows;
        if(sub_strand_id) {
          this.sub_strand_id = sub_strand_id;
        }
      }
    }
  },
  
  created() {
    // this.fetchQuestions();
    this.getLO();
    this.getGrades();
    // this.getBoards();
    this.getSubjects();
    this.getSkills();
    this.getLevels();
    
    
    this.questionUuid=uuidv4();

    if (this.$route.params.id) {
      this.fetchQuestions(this.$route.params.id);
    } else {
      this.getTopics();
      this.getStrands();
    }

  },
};
</script>
<style scoped>
.v-list-item__content {
  min-height: 64px;
}
</style>
