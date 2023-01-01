const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    first_name: {type: String, required: true, maxLength: 100},
    family_name: { type: String, required: true, maxLength: 100 },
    date_of_birth: { type: Date },
    date_of_death: { type: Date },

});

AuthorSchema.virtual("name").get(function() {
    let fullname = "";
    if (this.first_name && this.family_name) {
        fullname = `${this.first_name}, ${this.family_name}`;
    }

    if (!this.first_name || !this.family_name) {
        fullname = "";
    }
    return fullname;
});


AuthorSchema.virtual("url").get(function() {
    return `/catalog/author/${this._id}`;
});

AuthorSchema.virtual("date_of_birth_formatted").get(function () {
    if (this.date_of_birth) {
        return DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED);
    }
    return "";
})

AuthorSchema.virtual("date_of_death_formatted").get(function () {
    if (this.date_of_death) {
        return DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED);
    }
    return "";
})

AuthorSchema.virtual("date_of_birth_html").get(function() {
    if (this.date_of_birth) {
        const year = this.date_of_birth.toLocaleString("default", { year: "numeric" });
        const month = this.date_of_birth.toLocaleString("default", { month: "2-digit" });
        const date = this.date_of_birth.toLocaleString("default", { day: "2-digit" });
        return `${year}-${month}-${date}`;
    }
    return "";
})

AuthorSchema.virtual("date_of_death_html").get(function() {
    if (this.date_of_death) {
        const year = this.date_of_death.toLocaleString("default", { year: "numeric" });
        const month = this.date_of_death.toLocaleString("default", { month: "2-digit" });
        const date = this.date_of_death.toLocaleString("default", { day: "2-digit" });
        return `${year}-${month}-${date}`;    }
    return "";
})

module.exports = mongoose.model("Author", AuthorSchema);