const {program} = require('commander');
const xmlParser = require('fast-xml-parser');
const fs = require('fs');
const Parser = require("fast-xml-parser").j2xParser;

const xmlVersion = '<?xml version=\'1.0\' encoding=\'utf-8\'?>';
const options = {
    ignoreAttributes : false,
};


program
    .command('prep <app> <package>')
    .action((appName, package) => {

        try {

            let xml = fs.readFileSync('config.xml', 'utf8');

            let jsonObj = xmlParser.parse(xml,options);

            jsonObj.widget['@_id'] = package;
            jsonObj.widget.name = appName;
        
            const jsonParser = new Parser(options);
            
            let modifiedXML = jsonParser.parse(jsonObj);
            modifiedXML = xmlVersion + modifiedXML;
        
            fs.writeFileSync("config.xml", modifiedXML);
        
        } catch (error) {
            console.log(error.message);
        }

    });


    program.parse(process.argv);


